import React, { useEffect, useState } from "react";
function Login(props) {
    useEffect(() => {
        console.log('vx: props.authFlag', props.authFlag)
        if (props.authFlag === false) {
            autoSignIn()
            // lalala()
        }
    })
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    function autoSignIn() {
        console.log('vx: autoSignIn called...')
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        var username = typeof params.username === 'undefined' ? null:params.username
        var accessToken = typeof params.access_token === 'undefined' ? null:params.access_token
        var idToken = typeof params.id_token === 'undefined' ? null:params.id_token
        var accessTokenDecoded = parseJwt(accessToken)
        var now = Date.now()
        var authTime = accessTokenDecoded.auth_time * 1000
        // console.log('vx: auth_time', authTime)
        // console.log('vx: now', now)
        // console.log('vx: username', username)
        // console.log('vx: accessToken', accessToken)
        // console.log('vx: idToken', idToken)
        // console.log('vx: now', typeof now)
        // console.log('vx: authTime', typeof authTime)
        // console.log('vx: time diff', now - authTime)
        // console.log('vx: time diff ok?', now - authTime)
        if (now - authTime < 15000) {
            if ( username !== null && accessToken !== null && idToken !== null) {
                window.localStorage.clear()
                window.localStorage.setItem('CognitoIdentityServiceProvider.6ialng39qervtedvnhmo1459sg.LastAuthUser',username)
                window.localStorage.setItem('CognitoIdentityServiceProvider.6ialng39qervtedvnhmo1459sg.' + username + '.accessToken',accessToken)
                window.localStorage.setItem('CognitoIdentityServiceProvider.6ialng39qervtedvnhmo1459sg.' + username + '.idToken',idToken)
            }
        }
        window.location.href='/'
    }
    // return (
    //     <div>
    //         lalala
    //     </div>
    // )
}
export default Login;