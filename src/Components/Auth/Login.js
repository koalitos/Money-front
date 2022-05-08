import React, { useState, useEffect, useContext } from "react";

import './css/login.css'

import { useNavigate } from "react-router-dom";
import { ContasContext } from '../../Contexts/Contas'
const md5 = require('md5');
const axios = require('axios');

const Login = () => {
    const { setDataGet } = useContext(ContasContext)
    const [user, setUser] = useState()
    const [pass, setPass] = useState()
    const [data, setDataPost] = useState()

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const _click = () => {
        if (!user || !pass) {
            return console.error('erro')
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        setDataPost({
            user: user,
            pass: md5(pass)
        })
    }


    const _getLogin = (data) => {
        if (!data) {
            return
        }

        axios.get(`http://localhost:8888/login?user=${data.user}&pass=${data.pass}`)
        .then((response) => {
            if (response.status === 200) {
                const json = JSON.parse(response.request.response)

                localStorage.setItem('token', json._id)
                localStorage.setItem('user', json.name)
                setDataGet(json.name)
            }
        })
    }

    useEffect(() => {
        if (!loading && localStorage.getItem('token') !== null) {
            navigate('/home');
        }
    }, [loading, navigate]);

    useEffect(() => {
        _getLogin(data)
    }, [data]) 

    return(
        <div className="container-login">
            <video id="myVideo"
                src="./videos/bg3.mp4"
                muted
                autoPlay={"autoplay"}
                preLoad="auto"
                loop
            />

            <div className="container-login-box">
                <p className="container-login-box-user-text">User</p>
                <input className="container-login-box-user" type='text' onChange={(event) => setUser(event.target.value)}></input>
            </div>
            <div className="container-login-box">
                <p className="container-login-pass-box-text">Senha</p>
                <input className="container-login-box-pass" type='password' onChange={(event) => setPass(event.target.value)}></input>
            </div>

            <button className="container-login-btn" onClick={_click}> Login </button>
        </div>
    )
};

export default Login;