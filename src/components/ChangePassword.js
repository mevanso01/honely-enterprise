import '../styles/UserProfile.css';
import React, { useState, useEffect } from "react";

function ChangePassword(props) {
    var [data, setData] = useState({
        errorMessage: '',
        successMessage: '',
      });
    function updatePassword() {
        var oldPassword = document.getElementById('oldPw').value
        var newPassword = document.getElementById('newPw').value
        var newPassword2 = document.getElementById('newPw2').value
        // console.log(oldPassword)
        // console.log(newPassword)
        // console.log(newPassword2)
        if (newPassword !== newPassword2) {
            setData(() => {
                return {
                    errorMessage: 'Passwords do not match',
                    successMessage: '',
                }
            })
        } else if(oldPassword === '' || oldPassword === null) {
            setData(() => {
                return {
                    errorMessage: 'Please enter old password',
                    successMessage: '',
                }
            })
        } else if(!(/(?=.{8,})/.test(newPassword) && /(?=.*[!@#$%^&*])/.test(newPassword) && /(?=.*[0-9])/.test(newPassword) && /(?=.*[A-Z])/.test(newPassword) && /(?=.*[a-z])/.test(newPassword) )) {
            setData(() => {
                return {
                    errorMessage: 'New password does not satisfy all requirements',
                    successMessage: '',
                }
            })
        } else {
            props.auth.currentAuthenticatedUser()
            .then(user => {
                console.log('vx: user whose pw change', user)
                return props.auth.changePassword(user, oldPassword, newPassword);
            })
            .then(() => {
                setData(() => {
                    // console.log('vx: is data accessible here?', data)
                    return {
                        errorMessage: '',
                        successMessage: 'Password changed successfully!',
                    }
                })
                document.getElementById('oldPw').value = ''
                document.getElementById('newPw').value = ''
                document.getElementById('newPw2').value = ''
            })
            .catch((error) => {
                if (error.name === 'NotAuthorizedException') {
                    setData(() => {
                        return {
                            errorMessage: 'Old password is incorrect',
                            successMessage: '',
                        }
                    })
                } else if (error.name === 'LimitExceededException') {
                    setData(() => {
                        return {
                            errorMessage: 'Attempt limit exceeded, please try after some time.',
                            successMessage: '',
                        }
                    })
                } else {
                    setData(() => {
                        return {
                            errorMessage: 'Something went wrong. Please refresh the page and try again.',
                            successMessage: '',
                        }
                    })
                }
            })
        }
    }
    return(
        <div className='userprofile-wrapper'>
            <h3>Change Password</h3>
            <div className='userprofile-wrapper'>
            <div className='userprofile-form-group'>
            <label>Old Password</label>
            <input type="password" id='oldPw'></input>
            </div>
            <div className='userprofile-form-group'>
            <label>New Password</label>
            <input type="password" id='newPw'></input>
            </div>
            <div className="auth-password-requirements">
              <ul>
              <li><i className="fas fa-arrow-right subscription-logo" /><div>Must contain at least 8 characters</div></li>
              <li><i className="fas fa-arrow-right subscription-logo" /><div>Should contain at least 1 number and 1 special character</div></li>
              <li><i className="fas fa-arrow-right subscription-logo" /><div>Should contain at least 1 upper case and 1 lower case character</div></li>
              </ul>
            </div>
            <div className='userprofile-form-group'>
            <label>Confirm New Password</label>
            <input type="password" id='newPw2'></input>
            </div>
            <p className="userprofile-success-message">{data.successMessage}</p>
            <p className="userprofile-error-message">{data.errorMessage}</p>
            <button className='userprofile-update-btn' onClick={updatePassword}>Update</button>
            </div>
        </div>
    )
}

export default ChangePassword;