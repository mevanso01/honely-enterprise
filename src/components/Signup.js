import React, { useState, useEffect } from "react";
import '../styles/Signup.css'
import axios from 'axios';
import Amplify, { Auth } from 'aws-amplify'
import config from '../configs/aws-exports'
Amplify.configure(config)

function Signup(props) {

    useEffect(() => {
        document.getElementById("signup-phone").addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57)
            {
                evt.preventDefault();
            } else {
              enforcePhoneFormat()
            }
        });
    })

    const [confCodeSent, setConfCodeSent] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    function enforcePhoneFormat () {
        var phone = document.getElementById("signup-phone").value
        if (phone.length === 3) {
            phone = phone + '-'
        }
        if (phone.length === 7) {
            phone = phone + '-'
        }
        document.getElementById("signup-phone").value = phone
      }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    async function getBase64(file) {
        var pika = await toBase64(file);
        return pika
     }

    function doSignUp () {
        var companyName = document.getElementById('signup-companyname').value
        var fullName = document.getElementById('signup-fullname').value
        var phone = document.getElementById('signup-phone').value
        phone = phone.replace(/\D/g,'')
        var email = document.getElementById('signup-email').value
        var password = document.getElementById('signup-password').value
        var website = document.getElementById('signup-website').value
        var marketingConsent = true
        if (fullName === null || fullName === '') {
            setErrMsg('Name is required')
        } else if (!(/.+@.+\..+/.test(email))) {
            setErrMsg('Invalid Email')
        } else if (!(/(?=.{8,})/.test(password) && /(?=.*[!@#$%^&*])/.test(password) && /(?=.*[0-9])/.test(password) && /(?=.*[A-Z])/.test(password) && /(?=.*[a-z])/.test(password) )) {
            setErrMsg('Password does not satisfy all requirements')
        } else if (phone !== null && phone !== '' && phone.length !== 10) {
            setErrMsg('Invalid phone number')
        } else {
            var companyLogo = getBase64(selectedFile)
            unconfirmedUserCreation(fullName, email, password, phone, marketingConsent, companyName, website, companyLogo )
        }
    }

    async function unconfirmedUserCreation (fullName, email, password, phone, marketingConsent, companyName, website, companyLogo) {
        try {
            await new Promise((resolve) => {
                resolve(cognitoSignUp(email, password))
              })
              const params = {
                'email': email,
                'full-name': fullName,
                'phone-number': phone,
                'email-consent': marketingConsent,
                'company-name': companyName,
                'company-website': website,
                'logo': companyLogo,
              }
              axios.post('https://developers.honely.com/user', params)
              .then(() => {
                setErrMsg('Please enter the confirmation code sent to your email')
                setConfCodeSent(true)
              })
              .catch((error) => {
                if (error.name === 'UsernameExistsException') {
                    setErrMsg('This email is already in use.')
                } else {
                    setErrMsg(error.message)
                }
              })
        } catch (error) {
            if (error.name === 'UsernameExistsException') {
                setErrMsg('This email is already in use.')
            } else {
                setErrMsg(error.message)
            }
        }
    }

    async function cognitoSignUp(em, pw) {
        var username = em
          var password = pw
          var email = em
            const { user } = await Auth.signUp({
              username,
              password,
              attributes: {
                  email,          // optional
                  // other custom attributes 
              }
          });
      }

    async function confirmEmailAndSignIn () {
        var username = document.getElementById('signup-email').value
        var code = document.getElementById('signup-confcode').value
        var password = document.getElementById('signup-password').value
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
            <h1>Register and Begin Receiving Leads</h1>
            <br></br><br></br>
            <p>Please provide us with information about your business to register for Honely</p>
            </div>
            <div className="signup-form">
            <div>
            <label>Company Name</label>
            <input type="text" id='signup-companyname'  maxLength={100}></input>
            </div>
            <div>
            <label>Full Name</label>
            <input type="text" id='signup-fullname'  maxLength={50}></input>
            </div>
            <div>
            <label>Phone Number</label>
            <input type="text" id='signup-phone'  minLength={12} maxLength={12}></input>
            </div>
            <div>
            <label>Email</label>
            <input type="email" id='signup-email'  maxLength={50}></input>
            </div>
            <div>
            <label>Password</label>
            <input type="password" id='signup-password'  maxLength={50}></input>
            </div>
            <div>
            <label>Company Website</label>
            <input type="text" id='signup-website' ></input>
            </div>
            <div>
            <label>Upload Logo</label>
            <input type="file" id='signup-logo' onChange={(event) => {
                    // console.log('vx: event.target.files[0]', event.target.files[0])
                    setSelectedFile(event.target.files[0])
                }} ></input>
            </div>
            {
                confCodeSent &&
                <div>
                <label>Email Confirmation Code</label>
                <input type="text" id='signup-confcode'  maxLength={10}></input>
                </div>
            }
            Already have an account? <a onClick={() => {
                window.location.href = '/signin'
            }}>Sign In</a><br></br><br></br><br></br>
            {
                !confCodeSent &&
                <button onClick={() => {
                    doSignUp()
                }}>Register</button>
            }
            {
                confCodeSent &&
                <button onClick={() => {
                    confirmEmailAndSignIn()
                }}>Complete Registration</button>
            }
            <br></br><br></br>
            <p className="signup-errmsg">{errMsg}</p>
            </div>
        </div>
    )
}

export default Signup;