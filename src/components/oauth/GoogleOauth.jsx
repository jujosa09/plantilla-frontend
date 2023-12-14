import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import routerService from "../../service/routerService";

export default function GoogleOAuth() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const perfil = localStorage.getItem('email');

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login failed: ', error),
    });

    const logOut = () => {
        googleLogout();
        setProfile([]);
        setUser([]);
        localStorage.clear();
        appService.moveToMainPage();
    };

    useEffect(() => {
        if (user.length !== 0) {
        axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            setProfile(res.data);
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('token', user.access_token)
            localStorage.setItem('user', user)
            routerService.moveToProductos();
        }).catch((err) => console.log(err));
        }
    }, [user]);

    return(
        <>
        {(profile !== undefined && profile.length !== 0) || (perfil !== null && perfil !== undefined && perfil.length !== 0)? (
          <div>
              <a className="btn btn-outline-light btn-lg px-4" href="/" onClick={logOut}>Log out</a>
          </div>
        ) : (
            <a className="btn btn-outline-light btn-lg px-4" href="#!" onClick={() => {
                login();
            }}>Sign in with Google</a>
        )}
        </>
    )
}