import React, { useState, useEffect } from "react";
const md5 = require('md5');
const axios = require('axios');

const Register = () => {
    const [user, setUser] = useState()
    const [pass, setPass] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [data, setDataPost] = useState()

    const _click = () => {
        if (!name || !user) {
            return console.error('erro')
        }

        setDataPost({
            user: user,
            pass: md5(pass),
            name: name,
            email: email
        })
    }

    const _postRegister = (data) => {
        if (!data) {
            return
        }

        axios.post('http://localhost:8888/login/register', data)
    }

    useEffect(() => {
        _postRegister(data)
    }, [data]) 



    return(
        <>
            <p>User</p><input type='text' onChange={(event) => setUser(event.target.value)}></input>
            <p>Senha</p><input type='text' onChange={(event) => setPass(event.target.value)}></input>
            <p>Name</p><input type='text' onChange={(event) => setName(event.target.value)}></input>
            <p>Email</p><input type='text' onChange={(event) => setEmail(event.target.value)}></input>

            <button onClick={_click}> Save </button>
        </>
    )

};

export default Register;