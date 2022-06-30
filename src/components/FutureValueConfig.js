import React, { useState, useEffect } from "react";
import '../styles/FutureValueConfig.css'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import axios from 'axios';

function FutureValueConfig(props) {
    var [data, setData] = useState({
        errorMessage: '',
        successMessage: '',
        primaryColor: '',
        backgroundColor: '',
      });

    function ColorPickerPrimary(){
        const [color, setColor] = useColor("hex", data.primaryColor);
        return (
          <div>
              <h1>Iframe buttons and icons color:</h1>
              <br></br>
              <ColorPicker width={310} height={228} 
                         color={color} 
                         onChange={setColor} hideHSV dark />
          </div>
        )
      };
      function ColorPickerBackground(){
        const [color, setColor] = useColor("hex", data.backgroundColor);
        return (
          <div>
              <h1>Iframe popup color:</h1>
              <br></br>
              <ColorPicker width={310} height={228} 
                         color={color} 
                         onChange={setColor} hideHSV dark />
          </div>
        )
      };
    //   var initialBackgroundColor = null
    //   var initialPrimaryColor = null
      useEffect(() => {
        if (props.userProfile.api_key !== null) {
        let config = {
            headers: {
              'x-api-key': props.userProfile.api_key
            }
          }
          axios.get('https://developers.honely.com/user/settings', config)
          .then((response) => {
            // initialBackgroundColor = response.data.data.iframe_background_color
            // initialPrimaryColor = response.data.data.iframe_primary_color
            var colors = document.getElementsByClassName('rcp-fields-element-input')
            colors[1].value = response.data.data.iframe_background_color
            colors[3].value = response.data.data.iframe_primary_color
            colors[0].value = response.data.data.iframe_background_color
            colors[2].value = response.data.data.iframe_primary_color
            // console.log('vx: response.data.data.iframe_background_color', response.data.data.iframe_background_color)
            // console.log('vx: response.data.data.iframe_primary_color', response.data.data.iframe_primary_color)
            // setData((prevValue) => {
            //     return {
            //         errorMessage: '',
            //         successMessage: '',
            //         primaryColor: response.data.data.iframe_primary_color[0],
            //         backgroundColor: response.data.data.iframe_background_color,
            //     }
            // })
          })
        }
      })
      function submitPreferences() {
        var body = {
            "iframe_font_family_one": "Poppins, Roboto, Arial, Helvetica, sans-serif",
            "iframe_color_one": "#1A1D1B",
            "iframe_font_size_one": "18px",
            
            "iframe_font_family_two": "Poppins, sans-serif",
            "iframe_color_two": "#1F2937",
            "iframe_font_size_two": "16px",
        
            "iframe_font_family_three": "lato, verdana, sans-serif",
            "iframe_color_three": "#2C3E50",
            "iframe_font_size_three": "30px",
        
            "iframe_background_color": "white",
            "iframe_primary_color": "#24CB77"
        }
        var colors = document.getElementsByClassName('rcp-fields-element-input')
        // console.log('submitPreferences', colors)
        console.log('vx: color1', colors[1].value)
        console.log('vx: color2', colors[3].value)
        body["iframe_background_color"] = colors[1].value
        body["iframe_primary_color"] = colors[3].value
        console.log('vx: modified body', body)
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
          console.log('vx: about to update fv settings, jwt is', props.jwt)
        axios.post('https://developers.honely.com/user/settings', body, config)
        .then(() => {
            setData((prevValue) => {
                return {
                    errorMessage: '',
                    successMessage: 'Updated successfully!',
                    primaryColor: prevValue.primaryColor,
                    backgroundColor: prevValue.backgroundColor
                }
            })
            setTimeout(() => {
                setData((prevValue) => {
                    return {
                        errorMessage: '',
                        successMessage: '',
                        primaryColor: prevValue.primaryColor,
                        backgroundColor: prevValue.backgroundColor
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
                  errorMessage: 'Something went wrong. Please try again later.',
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
    if (props.userProfile.api_key === null) {
      return (
        <div className="futurevalueconfig-wrapper">
        <p>Please generate an API key to configure your Future value page</p>
        </div>
      )
    } else {
      return(
        <div className="futurevalueconfig-wrapper">
            <h3>Future Value Style Configurations</h3>
            <div className="futurevalueconfig-options">
                <ColorPickerBackground />
                <br></br><br></br><br></br>
                <ColorPickerPrimary />
                <br></br><br></br>
                <p className="futurevalueconfig-success-message">{data.successMessage}</p>
                <p className="futurevalueconfig-error-message">{data.failureMessage}</p>
                <button onClick={submitPreferences}>Save Preferences</button>
            </div>
        </div>
    )
    }
}

export default FutureValueConfig;