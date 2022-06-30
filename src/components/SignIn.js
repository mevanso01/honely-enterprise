import React, { useState, useEffect } from "react";
import '../styles/Signup.css'
import axios from 'axios';
import Amplify, { Auth } from 'aws-amplify'
import config from '../configs/aws-exports'
Amplify.configure(config)

function SignIn(props) {
    const [confCodeSent, setConfCodeSent] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    var inputBorderProperties = {
        border: '1px solid #00000054',
        borderRadius: '2px',
    }

    async function doSignIn () {
      var email = document.getElementById('signin-email').value
      var password = document.getElementById('signin-password').value
      try {
        await Auth.signIn(email, password);
        props.updateAuthState()
        window.location.href = '/'
      } catch(error) {
        if(error.name === 'UserNotConfirmedException') {
            await Auth.resendSignUp(email)
            setConfCodeSent(true)
            setErrMsg('Please enter the confirmation code sent to your email')
        } else if(error.name === 'NotAuthorizedException') {
            axios.post('https://developers.honely.com/user/check-email', {
                email: email,
            })
            .then((response) => {
                if (response.data.data.available === true) {
                    setErrMsg('No account found with this email address')
                } else {
                    setErrMsg('Wrong password')
                }
            })
        } else {
            setErrMsg('')
        }
      }
    }

    async function confirmEmailAndSignIn () {
        var username = document.getElementById('signin-email').value
        var code = document.getElementById('signin-confcode').value
        var password = document.getElementById('signin-password').value
        try {
            await Auth.confirmSignUp(username, code)
            await new Promise((resolve) => {
                resolve(confirmUser(username))
                cognitoSignIn(username, password)
              })
        } catch (error) {
            if (error.name === 'CodeMismatchException') {
                setErrMsg('Invalid confirmation code')
            } else {
                setErrMsg(error.message)
            }
        }
    }

    function confirmUser (email) {
        console.log('vx: calling confirmUser...')
        console.log('vx: setting user-email in headers...', email)
        const headerObj = {
          "user-email": email
        }
        axios.patch('https://developers.honely.com/user/confirm', {}, {
        headers: headerObj})
      }

      async function cognitoSignIn (username, password) {
        console.log('vx: calling cognitoSignIn...')
        const user = await Auth.signIn(username, password);
        console.log('vx: user signed in', user)
        props.updateAuthState()
        window.location.href = '/'
      }

    return (
        <div className="signup-container">
            <div className="signup-header">
            <h1>Sign in to Honely Dashboard</h1>
            </div>
            <div className="signup-form">
            <div>
            <label>Email</label>
            <input type="email" id='signin-email' style={inputBorderProperties} maxLength={50}></input>
            </div>
            <div>
            <label>Password</label>
            <input type="password" id='signin-password' style={inputBorderProperties} maxLength={50}></input>
            </div>
            {
                confCodeSent &&
                <div>
                <label>Email Confirmation Code</label>
                <input type="text" id='signin-confcode' style={inputBorderProperties} maxLength={10}></input>
                </div>
            }
            Don't have an account? <a onClick={() => {
                window.location.href = '/signup'
            }}>Sign Up</a><br></br><br></br><br></br>
            {
                !confCodeSent &&
                <button onClick={() => {
                    doSignIn()
                }}>Sign In</button>
            }
            {
                confCodeSent &&
                <button onClick={() => {
                    confirmEmailAndSignIn()
                }}>Sign In</button>
            }
            <br></br><br></br>
            <p className="signup-errmsg">{errMsg}</p>
            </div>
        </div>
    );
}

export default SignIn;