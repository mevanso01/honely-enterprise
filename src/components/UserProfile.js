import '../styles/UserProfile.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function UserProfile(props) {
    var [data, setData] = useState({
        errorMessage: '',
        successMessage: '',
      });
    useEffect(() => {
        // console.log('vx: props.that on userprofile page', props.updateUserProfile)
        document.getElementById("phoneInput").addEventListener("keypress", function (evt) {
            if (evt.which < 48 || evt.which > 57)
            {
                evt.preventDefault();
            } else {
                enforcePhoneFormat()
            }
        });
    })
    function enforcePhoneFormat () {
        var phone = document.getElementById("phoneInput").value
        if (phone.length === 3) {
            phone = phone + '-'
        }
        if (phone.length === 7) {
            phone = phone + '-'
        }
        document.getElementById("phoneInput").value = phone
    }
    function enforcePhoneFormat2 (value) {
        if (value !== null && value !== '' && value.length === 10) {
            return value.substring(0,3) + '-' + value.substring(3,6) + '-' + value.substring(6,10)
        } else {
            return ''
        }
    }
    function updateProfile () {
        console.log('vx: updateProfile being called at all..')
        var name = document.getElementById('nameInput').value
        var phone = document.getElementById('phoneInput').value
        phone = phone.replace(/\D/g,'')
        var companyName = document.getElementById('companyNameInput').value
        var companyUrl = document.getElementById('companyUrlInput').value
        if(phone !== null && phone !== '' && phone.length < 10) {
            console.log('vx: Phone number should have at least 10 digits.')
            setData(() => {
                return {
                    errorMessage: 'Phone number should have at least 10 digits.',
                    successMessage: '',
                }
            })
        } else {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + props.jwt
                }
              }
            var body = {
                "full_name": name,
                "phone_number": phone,
                "company_name": companyName,
                "company_url": companyUrl
            }
            console.log('vx: body for userprofile update', body)
            console.log('vx: config for userprofile update', config)
            axios.patch('https://developers.honely.com/user', body, config)
            .then(() => {
                var newUserProfile = props.userProfile
                newUserProfile.full_name = name
                newUserProfile.phone_number = phone
                newUserProfile.company_name = companyName
                newUserProfile.company_url = companyUrl
                props.updateUserProfile(newUserProfile)
                setData(() => {
                    return {
                        errorMessage: '',
                        successMessage: 'Successfully Updated!',
                    }
                })
                setTimeout(() => {
                    setData(() => {
                        return {
                            errorMessage: '',
                            successMessage: '',
                        }
                    })
                }, 3000)
            })
            .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            props.doSignOut()
          } else {
            setData(() => {
                return {
                    // errorMessage: 'Something went wrong. Please refresh the page and try again.',
                    errorMessage: error.message,
                    successMessage: '',
                }
            })
            setTimeout(() => {
                setData(() => {
                    return {
                        errorMessage: '',
                        successMessage: '',
                    }
                })
            }, 3000)
          }
            })
        }
    }
    return (
        <div className='userprofile-wrapper'>
            <h3>Edit Profile Info</h3>
            <div className='userprofile-wrapper'>
            <div className='userprofile-form-group'>
            <label>Name</label>
            <input defaultValue={props.userProfile.full_name} id='nameInput'></input>
            </div>
            <div className='userprofile-form-group'>
            <label>Email</label>
            <input className='userprofile-readonly' defaultValue={props.userProfile.email} readOnly></input>
            </div>
            <div className='userprofile-form-group'>
            <label>Phone</label>
            <input defaultValue={enforcePhoneFormat2(props.userProfile.phone_number)} id='phoneInput' minLength={12} maxLength={12}></input>
            </div>
            <div className='userprofile-form-group'>
            <label>Company Name</label>
            <input defaultValue={props.userProfile.company_name} id='companyNameInput'></input>
            </div>
            <div className='userprofile-form-group'>
            <label>Company Website</label>
            <input defaultValue={props.userProfile.company_url} id='companyUrlInput'></input>
            </div>
            <p className="userprofile-success-message">{data.successMessage}</p>
            <p className="userprofile-error-message">{data.errorMessage}</p>
            <button className='userprofile-update-btn' onClick={updateProfile}>Update</button>
            </div>
        </div>
    )
}

export default UserProfile;