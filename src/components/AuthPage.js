import '../styles/Auth.css';
import Amplify, { Auth } from 'aws-amplify'
import config from '../configs/aws-exports'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { TrinitySpinner } from 'loading-animations-react';
Amplify.configure(config)
  function AuthPage(props) {
    const [data, setData] = useState({
      email: null,
      password: null,
      showConfirmationCodeBoxInSignUp: false,
      showConfirmationCodeBoxInSignIn: false,
      signInErrorMessage: '',
      signUpErrorMessage: '',
    });
    const [forgotPw, setForgotPwState] = useState(
      {
        flag: false,
        codeSent: false,
        errorMsg: '',
        email: null,
      }
    )
    var [loadingFlag , setLoadingFlag] = useState(false)
    // Auth.currentAuthenticatedUser()
    // .then((user) => {
    //   console.log('vx: current authenticated user', user)
    // })
    async function unconfirmedUserCreation (fullName, email, password, phone, marketingConsent) {
      try {
        await new Promise((resolve) => {
          resolve(cognitoSignUp(email, password))
        })
        const params = {
          email: email,
          full_name: fullName,
          phone_number: phone,
          email_consent: marketingConsent
        }
        axios.post('https://developers.honely.com/user', params)
        setData((prevValue) => {
          return {
            email: email,
            password: password,
            showConfirmationCodeBoxInSignUp: true,
            showConfirmationCodeBoxInSignIn: false,
            signInErrorMessage: '',
            signUpErrorMessage: 'Please enter the confirmation code sent to your email',
          }
        })
      } catch (error) {
        // console.log('vx: dugtrio', error.message)
        if (error.name === 'UsernameExistsException') {
          setData((prevValue) => {
            return {
              email: email,
              password: password,
              showConfirmationCodeBoxInSignUp: false,
              showConfirmationCodeBoxInSignIn: false,
              signInErrorMessage: '',
              signUpErrorMessage: 'This email is already in use.',
            }
          })
        } else {
          setData((prevValue) => {
            return {
              email: email,
              password: password,
              showConfirmationCodeBoxInSignUp: false,
              showConfirmationCodeBoxInSignIn: false,
              signInErrorMessage: '',
              signUpErrorMessage: error.message,
            }
          })
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
    function selectAuthSection(index){
      console.log('selectAuthSection getting called')
      const x = document.getElementsByClassName('auth-subsection')
      const y = document.getElementsByClassName('auth-btn-switch-option')
      for (let i = 0; i < x.length; i++) {
        if (index == i) {
          x[i].classList.add('active')
          y[i].classList.add('active')
        } else {
          x[i].classList.remove('active')
          y[i].classList.remove('active')
        }
      }
      if (index === 1) {
        // if (document.querySelector("phone")) {
          console.log('control coming here, larvitar')
          document.getElementById("phone").addEventListener("keypress", function (evt) {
              if (evt.which < 48 || evt.which > 57)
              {
                  evt.preventDefault();
              } else {
                enforcePhoneFormat()
              }
          });
        // }
      }
    }
    function enforcePhoneFormat () {
      var phone = document.getElementById("phone").value
      if (phone.length === 3) {
          phone = phone + '-'
      }
      if (phone.length === 7) {
          phone = phone + '-'
      }
      document.getElementById("phone").value = phone
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
    async function cognitoSignIn (username, password) {
      console.log('vx: calling cognitoSignIn...')
      const user = await Auth.signIn(username, password);
      console.log('vx: user signed in', user)
      props.updateAuthState()
      window.location.href = '/'
    }
    async function confirmEmailAndSignIn () {
      // call auth email confirm
      var mode = ''
      var username = data.email
      var code = null
      if (document.getElementById('confirmation-code-signin') && document.getElementById('confirmation-code-signin').value) {
        code  = document.getElementById('confirmation-code-signin').value
        mode = 'signin'
      }
      if (document.getElementById('confirmation-code-signup') && document.getElementById('confirmation-code-signup').value) {
        code = document.getElementById('confirmation-code-signup').value
        mode = 'signup'
      }
      var password = data.password
      console.log('vx: calling Auth.confirmSignUp...')
      console.log('vx: username', username)
      console.log('vx: code', code)
      try {
        setLoadingFlag(() => {
          return true
        })
        await Auth.confirmSignUp(username, code)
        // call users patch
      await new Promise((resolve) => {
        resolve(confirmUser(username))
      })
      // call auth signin
      cognitoSignIn(username, password)
      setLoadingFlag(() => {
        return false
      })
      } catch (error) {
        setLoadingFlag(() => {
          return false
        })
        console.log('vx: error noctowl', error)
        if (error.name === 'CodeMismatchException') {
          if (mode === 'signin') {
            setData((prevValue) => {
              return {
                email: username,
                password: password,
                showConfirmationCodeBoxInSignUp: false,
                showConfirmationCodeBoxInSignIn: true,
                signInErrorMessage: 'Invalid confirmation code',
                signUpErrorMessage: '',
              }
            })
          }
          if (mode === 'signup') {
            setData((prevValue) => {
              return {
                email: username,
                password: password,
                showConfirmationCodeBoxInSignUp: true,
                showConfirmationCodeBoxInSignIn: false,
                signInErrorMessage: '',
                signUpErrorMessage: 'Invalid confirmation code',
              }
            })
          }
        }
      }
      // // call users patch
      // await new Promise((resolve) => {
      //   resolve(confirmUser(username))
      // })
      // // call auth signin
      // cognitoSignIn(username, password)
    }
    async function doSignIn () {
      var email = document.getElementById('email-signin').value
      var password = document.getElementById('password-signin').value
      try {
        setLoadingFlag(() => {
          return true
        })
        const user = await Auth.signIn(email, password);
        console.log('vx: user logged in', user)
        props.updateAuthState()
        window.location.href = '/'
      } catch(error) {
        if(error.name === 'UserNotConfirmedException') {
          await Auth.resendSignUp(email)
          setLoadingFlag(() => {
            return false
          })
          setData((prevValue) => {
            return {
              email: email,
              password: password,
              showConfirmationCodeBoxInSignUp: false,
              showConfirmationCodeBoxInSignIn: true,
              signInErrorMessage: 'Please enter the confirmation code sent to your email',
              signUpErrorMessage: '',
            }
          })
        }
        // vx: if pw wrong error.name is NotAuthorizedException (wrong email too)
        else if(error.name === 'NotAuthorizedException') {
          axios.post('https://developers.honely.com/user/check-email', {
            email: email,
          })
          .then((response) => {
            if (response.data.data.available === true) {
              setLoadingFlag(() => {
                return false
              })
              setData((prevValue) => {
                return {
                  email: email,
                  password: password,
                  showConfirmationCodeBoxInSignUp: false,
                  showConfirmationCodeBoxInSignIn: false,
                  signInErrorMessage: 'No account found with this email address',
                  signUpErrorMessage: '',
                }
              })
            } else {
              setLoadingFlag(() => {
                return false
              })
              setData((prevValue) => {
                return {
                  email: email,
                  password: password,
                  showConfirmationCodeBoxInSignUp: false,
                  showConfirmationCodeBoxInSignIn: false,
                  signInErrorMessage: 'Wrong password',
                  signUpErrorMessage: '',
                }
              })
            }
          })
        } else {
          setLoadingFlag(() => {
            return false
          })
          setData((prevValue) => {
            return {
              email: email,
              password: password,
              showConfirmationCodeBoxInSignUp: false,
              showConfirmationCodeBoxInSignIn: false,
              signInErrorMessage: error.message,
              signUpErrorMessage: '',
            }
          })
        }
      }
    }
    async function doSignOut () {
      await Auth.signOut();
    }
    function doSignUp () {
      var fullName = document.getElementById('full-name').value
      var email = document.getElementById('email').value
      var password = document.getElementById('password').value
      var phone = document.getElementById('phone').value
      phone = phone.replace(/\D/g,'')
      var marketingConsent = document.getElementById('marketing-consent').checked
      if (fullName === null || fullName === '') {
        setData((prevValue) => {
          return {
            email: email,
            password: password,
            showConfirmationCodeBoxInSignUp: false,
            showConfirmationCodeBoxInSignIn: false,
            signInErrorMessage: '',
            signUpErrorMessage: 'Name is required',
          }
        })
      }
      else if (!(/.+@.+\..+/.test(email))) {
        setData((prevValue) => {
          return {
            email: email,
            password: password,
            showConfirmationCodeBoxInSignUp: false,
            showConfirmationCodeBoxInSignIn: false,
            signInErrorMessage: '',
            signUpErrorMessage: 'Invalid Email',
          }
        })
      } else if (!(/(?=.{8,})/.test(password) && /(?=.*[!@#$%^&*])/.test(password) && /(?=.*[0-9])/.test(password) && /(?=.*[A-Z])/.test(password) && /(?=.*[a-z])/.test(password) )) {
        console.log('vx: email here is', email)
        console.log('vx: oh btw email check returned', /.+@.+\..+/.test(email))
        setData((prevValue) => {
          return {
            email: email,
            password: password,
            showConfirmationCodeBoxInSignUp: false,
            showConfirmationCodeBoxInSignIn: false,
            signInErrorMessage: '',
            signUpErrorMessage: 'Password does not satisfy all requirements',
          }
        })
      } else if (phone !== null && phone !== '' && phone.length !== 10) {
        setData((prevValue) => {
          return {
            email: email,
            password: password,
            showConfirmationCodeBoxInSignUp: false,
            showConfirmationCodeBoxInSignIn: prevValue.showConfirmationCodeBoxInSignIn,
            signInErrorMessage: '',
            signUpErrorMessage: 'Invalid phone number',
          }
        })
      } else {
        // setData((prevValue) => {
        //   return {
        //     email: email,
        //     password: password,
        //     showConfirmationCodeBoxInSignUp: true,
        //     showConfirmationCodeBoxInSignIn: prevValue.showConfirmationCodeBoxInSignIn,
        //     signInErrorMessage: '',
        //     signUpErrorMessage: 'Please enter the confirmation code sent to your email',
        //   }
        // })
        unconfirmedUserCreation(fullName, email, password, phone, marketingConsent)
      }
    }
    // function lalala () {
    //   Auth.forgotPassword('')
    //   .then(data => console.log(data))
    // }
    function resendCode () {
      var mode = ''
      if(document.getElementById('confirmation-code-signin')) {
        mode = 'signin'
      }
      if(document.getElementById('confirmation-code-signup')) {
        mode = 'signup'
      }
      Auth.resendSignUp(data.email)
      .then(() => {
        setData((prevValue) => {
          return {
            email: prevValue.email,
            password: prevValue.password,
            showConfirmationCodeBoxInSignUp: prevValue.showConfirmationCodeBoxInSignUp,
            showConfirmationCodeBoxInSignIn: prevValue.showConfirmationCodeBoxInSignIn,
            signInErrorMessage: (mode === 'signin')?'Confirmation code resent succesfully!':'',
            signUpErrorMessage: (mode === 'signup')?'Confirmation code resent succesfully!':'',
          }
        })
      })
      .catch((error) => {
        setData((prevValue) => {
          return {
            email: prevValue.email,
            password: prevValue.password,
            showConfirmationCodeBoxInSignUp: true,
            showConfirmationCodeBoxInSignIn: prevValue.showConfirmationCodeBoxInSignIn,
            signInErrorMessage: (mode === 'signin')?error.message:'',
            signUpErrorMessage: (mode === 'signup')?error.message:'',
          }
        })
      })
    }
    function goToForgotPwSection () {
      if (forgotPw.flag === false) {
        setForgotPwState((prevValue) => {
          return {
            flag: true,
            codeSent: false,
            errorMsg: '',
            email: prevValue.email,
          }
        })
      } else {
        setForgotPwState((prevValue) => {
          return {
            flag: false,
            codeSent: false,
            errorMsg: '',
            email: prevValue.email,
          }
        })
      }
    }
    function goToForgotPwSectionInitial () {
      setForgotPwState((prevValue) => {
        return {
          flag: true,
          codeSent: false,
          errorMsg: '',
          email: null,
        }
      })
    }
    function sendPwResetCode() {
      var email = document.getElementById('email-forgotpw').value
      if (!(/.+@.+\..+/.test(email))) {
        setForgotPwState(() => {
          return {
            flag: true,
            codeSent: false,
            errorMsg: 'Invalid Email',
            email: email,
          }
        })
      } else {
        document.getElementById('email-forgotpw').value = ''
        Auth.forgotPassword(email)
      .then(() => {
        setForgotPwState(() => {
          return {
            flag: true,
            codeSent: true,
            errorMsg: '',
            email: email,
          }
        })
      })
      .catch((error) => {
        setForgotPwState(() => {
          return {
            flag: true,
            codeSent: false,
            errorMsg: error.message,
            email: email,
          }
        })
      })
      }
    }
    function resetPw () {
      var code = document.getElementById('code-forgotpw').value
      var password = document.getElementById('password-forgotpw').value
      if (!(/(?=.{8,})/.test(password) && /(?=.*[!@#$%^&*])/.test(password) && /(?=.*[0-9])/.test(password) && /(?=.*[A-Z])/.test(password) && /(?=.*[a-z])/.test(password) )) {
        setForgotPwState((prevValue) => {
          return {
            flag: true,
            codeSent: true,
            errorMsg: 'New password does not satisfy all requirements',
            email: prevValue.email,
          }
        })
      } else {
        Auth.forgotPasswordSubmit(forgotPw.email, code, password)
      .then(() => {
        setForgotPwState(() => {
          return {
            flag: false,
            codeSent: false,
            errorMsg: '',
            email: null,
          }
        })
        //success, set signinerrormsg
        setData((prevValue) => {
          return {
            email: null,
            password: null,
            showConfirmationCodeBoxInSignUp: false,
            showConfirmationCodeBoxInSignIn: false,
            signInErrorMessage: 'Password reset successfully. Sign in with new password',
            signUpErrorMessage: '',
          }
        })
      })
      .catch((error) => {
        setForgotPwState((prevValue) => {
          return {
            flag: true,
            codeSent: true,
            errorMsg: error.message,
            email: prevValue.email,
          }
        })
      })
      }
    }
    function SignInButton () {
      return loadingFlag === false &&
      data.showConfirmationCodeBoxInSignIn === true?
      <button onClick={confirmEmailAndSignIn} className="btn btn-primary btn-block">Sign In</button>
      :
      <div>
        <span className="auth-other-options" onClick={goToForgotPwSection}>Forgot your Password?</span>
      <button onClick={doSignIn} className="btn btn-primary btn-block auth-signin-button">Sign In</button>
      </div>
    }
    function SignUpButton () {
      return data.showConfirmationCodeBoxInSignUp?
      <button onClick={confirmEmailAndSignIn} className="btn btn-primary btn-block">Complete Registration</button>
      :
      <button onClick={doSignUp} className="btn btn-primary btn-block">Register</button>
    }
    if (forgotPw.flag === true) {
      if (forgotPw.codeSent === false) {
        return (
          <div className="auth-wrapper">
            <div className="auth-inner active">
              <h2 className='auth-pw-reset-title'>PASSWORD RESET</h2>
              <br></br><br></br>
            <div className="form-group">
                <label>Enter Email Address</label>
                <input type="email" className="form-control" placeholder="Enter Email Address" id="email-forgotpw"/>
            </div>
            <p className='auth-error-message'>{forgotPw.errorMsg}</p>
            <span className="auth-other-options" onClick={goToForgotPwSection}>Back to Sign In/Sign Up</span>
            <button onClick={sendPwResetCode} className="btn btn-primary btn-block auth-signin-button">Request Password Reset</button>
            </div>
          </div>
        )
      } else {
        return (
          <div className="auth-wrapper">
            <div className="auth-inner active">
            <h2 className='auth-pw-reset-title'>PASSWORD RESET</h2>
              <br></br><br></br>
            <div className="form-group">
                <label>Code</label>
                <input type="text" className="form-control" placeholder="Enter Code" id="code-forgotpw"/>
            </div>
            <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-control" placeholder="Enter New Password" id="password-forgotpw"/>
            </div>
            <div className="auth-password-requirements">
              <ul>
              <li><i className="fas fa-arrow-right subscription-logo" /><div>Must contain at least 8 characters</div></li>
              <li><i className="fas fa-arrow-right subscription-logo" /><div>Should contain at least 1 number and 1 special character</div></li>
              <li><i className="fas fa-arrow-right subscription-logo" /><div>Should contain at least 1 upper case and 1 lower case character</div></li>
              </ul>
            </div>
            <p className='auth-error-message'>{forgotPw.errorMsg}</p>
            <span className="auth-other-options" onClick={goToForgotPwSectionInitial}>Enter different email for Password Reset</span>
            <br></br><br></br>
            <span className="auth-other-options" onClick={goToForgotPwSection}>Back to Sign In/Sign Up</span>
            <button onClick={resetPw} className="btn btn-primary btn-block auth-signin-button">Reset Password</button>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="auth-wrapper">
          {/* <button onClick={lalala}>lalala</button> */}
          <div className='auth-links-container'>
          <div>
          <span className="auth-link" onClick={() => {window.location.href = 'https://www.honely.com'}}><span className="mdi mdi-arrow-top-right" />Go to Honely.com</span>
          </div>
          <div>
          <span className="auth-link" onClick={() => {window.location.href = 'https://volkov-alex.github.io/honely-external-api-docs'}}><span className="mdi mdi-file-document" />API Documentation</span>
          </div>
          </div>
          <div className="auth-inner">
          <div className="auth-btn-switch auth-btn-sm">
            <span className="auth-btn-switch-option active" onClick={() => {selectAuthSection(0)}}> Log In </span>
            <span className="auth-btn-switch-option" onClick={() => {selectAuthSection(1)}}> Sign Up </span>
          </div>
          {/* <form> */}
                    {/* <div onClick={selectAuthSection(0)}>*/}
                    {/* <h3 onClick={lalala}>Sign Up</h3> */}
                    {/* </div> */}
                    <div className="auth-subsection active">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter Email Address" id="email-signin"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" id="password-signin"/>
                    </div>
                    {/* <ConfirmationCodeBox displayFlag={showConfirmationCodeBoxInSignIn} /> */}
                    {
                    data.showConfirmationCodeBoxInSignIn &&
                    <div className="form-group">
                          <label>Email Confirmation Code</label>
                          <input type="text" className="form-control" placeholder="Enter Email Confirmation Code" id="confirmation-code-signin"/>
                          <span className='auth-resend-code' onClick={resendCode}>Resend confirmation code</span>
                      </div>
                    }
                    <p className='auth-error-message'>{data.signInErrorMessage}</p>
                    {
                      loadingFlag === false &&
                      <SignInButton />
                    }
                    {
                      loadingFlag === true && <div className='auth-loading-animation'>
                      <TrinitySpinner width="100px" color="#24cb43" />
                      </div>
                    }
                    
                </div>
                <div className="auth-subsection">
                <div className="form-group">
                        <label>Full name</label>
                        <input type="text" className="form-control" placeholder="Enter Full Name" id="full-name" maxLength={50} />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter Email Address" id="email" maxLength={50}/>
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" id="password" maxLength={50}/>
                    </div>
                    <div className="auth-password-requirements">
                      <ul>
                      <li><i className="fas fa-arrow-right subscription-logo" /><div>Must contain at least 8 characters</div></li>
                      <li><i className="fas fa-arrow-right subscription-logo" /><div>Should contain at least 1 number and 1 special character</div></li>
                      <li><i className="fas fa-arrow-right subscription-logo" /><div>Should contain at least 1 upper case and 1 lower case character</div></li>
                      </ul>
                    </div>
                    <div className="form-group">
                        <label>Phone number (optional)</label>
                        <input type="text" className="form-control" placeholder="Enter 10 digit Phone Number" id="phone" minLength={12} maxLength={12}/>
                    </div>
                    {
                    data.showConfirmationCodeBoxInSignUp &&
                    <div className="form-group">
                          <label>Email Confirmation Code</label>
                          <input type="text" className="form-control" placeholder="Enter Email Confirmation Code" id="confirmation-code-signup" maxLength={10}/>
                          <span className='auth-resend-code' onClick={resendCode}>Resend confirmation code</span>
                      </div>
                    }
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="marketing-consent" />
                            <label className="custom-control-label" htmlFor="marketing-consent">Marketing Email Consent</label>
                        </div>
                    </div>
                    <p className='auth-error-message'>{data.signUpErrorMessage}</p>
                    {
                      loadingFlag === false && <SignUpButton />
                    }
                    {
                      loadingFlag === true && <div className='auth-loading-animation'>
                      <TrinitySpinner width="100px" color="#24cb43" />
                      </div>
                    }
                    {/* <button onClick={doSignUp} className="btn btn-primary btn-block">Register</button> */}
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                {/* </form>   */}
                    </div>
                    <br></br>
                    {/* <button onClick={lalala} className="btn btn-primary btn-block">lalala</button> */}
                    {/* <TestComponent dummyProp={lalala}/> */}
                    {/* <button onClick={doSignOut} className="btn btn-primary btn-block">Sign Out</button> */}
        </div>
        </div>
      );
    }
  }
  
  export default AuthPage;
  