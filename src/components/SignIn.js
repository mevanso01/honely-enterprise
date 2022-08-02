import React, { useState, useEffect } from "react";
import '../styles/Signup.css'
import axios from 'axios';
import Amplify, { Auth } from 'aws-amplify'
import config from '../configs/aws-exports'
Amplify.configure(config)

function SignIn(props) {
    const [confCodeSent, setConfCodeSent] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [forcePwFlag, setForcePwFlag] = useState(false)
    const [forcePwUser, setForcePwUser] = useState(null)
    // const [forcePwNewPw, setForcePwNewPw] = useState('')
    // useEffect(() => {
    //     Auth.currentAuthenticatedUser()
    //     .then((response) => {
    //         console.log('vx: mounted sign in page, current user', response)
    //     })
    //     .catch((error) => {
    //         console.log('vx: mounted sign in page, current user ERROR', error)
    //     })
    // }, [])

    var inputBorderProperties = {
        border: '1px solid #00000054',
        borderRadius: '2px',
    }

    async function doSignIn () {
      var email = document.getElementById('signin-email').value
      var password = document.getElementById('signin-password').value
      try {
        Auth.signIn(email, password)
        .then((response) => {
            console.log('vx: sign in response', response.challengeName)
            if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
                setForcePwFlag(true)
                setForcePwUser(response)
                setErrMsg('Please set new password')
            } else {
                props.updateAuthState()
                window.location.href = '/'
            }
        })
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
            console.log('vx: sign in error', error.name)
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

      function setNewPwAndSignIn () {
        var password = document.getElementById('forcePw-password').value
        var confirmPassword = document.getElementById('forcePw-password-confirm').value
        if(password !== confirmPassword) {
            setErrMsg('Passwords do not match')
        } else if (!(/(?=.{8,})/.test(password) && /(?=.*[!@#$%^&*])/.test(password) && /(?=.*[0-9])/.test(password) && /(?=.*[A-Z])/.test(password) && /(?=.*[a-z])/.test(password) )) {
            setErrMsg('Password does not satisfy all requirements')
        }
        else {
            setErrMsg('')
            Auth.completeNewPassword(
                forcePwUser,
                password,
            ).then(() => {
                props.updateAuthState()
                window.location.href = '/'
            })
            .catch((e) => {
              console.log('vx: completeNewPassword ERROR', e)
            })
        }
      }

    return (
        <div className="signup-container">
            <div className="signup-header">
            <h1>Sign in to Honely Dashboard</h1>
            </div>
            {
                !forcePwFlag && 
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
            }
            {
                forcePwFlag && 
                <div className="signup-form">
                <div>
                <label>Enter New Password</label>
                <input type="password" id='forcePw-password' style={inputBorderProperties} maxLength={50}></input>
                </div>
                <div>
                <label>Confirm New Password</label>
                <input type="password" id='forcePw-password-confirm' style={inputBorderProperties} maxLength={50}></input>
                </div>
                <button onClick={() => {
                        setNewPwAndSignIn()
                    }}>Sign In</button>
                <br></br><br></br>
                <p className="signup-errmsg">{errMsg}</p>
                </div>
            }
        </div>
    );
}

export default SignIn;