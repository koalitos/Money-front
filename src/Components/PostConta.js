import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ContasContext } from '../Contexts/Contas'
const axios = require('axios');

const PostConta = () => {
    const { dataGet, dataPost, setDataGet, setDataPost } = useContext(ContasContext)
    const [name, setName] = useState()
    const [value, setValue] = useState()
    const [estado, setEstado] = useState(true)
    const [tipo, setTipo] = useState('Saida')
    const navigate = useNavigate()


    const _clickEstado = (boll) => {
        if (!boll) {
            return setEstado(false)
        }

        setEstado(true)
    }

    const _click = () => {
        if (!name || !value) {
            return console.error('erro')
        }

        setDataPost({
            name: name,
            user: localStorage.getItem('user'),
            type: tipo,
            value: parseFloat(value),
        })
    }


    const _postConta = (data) => {
        if (!data) {
            return setDataPost(undefined)
        }
        console.log('aa', data)
        axios.post('http://localhost:8888/conta', data)

        setDataGet(data)   
        setDataPost(undefined)   
    }

    const handleChange = (e) => {
        const { value } = e.target;

        if (!value) {
            return
        }

        setTipo(value)
    };


    const _logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }


    useEffect(() => {
        _postConta(dataPost)
        _clickEstado()
    }, [dataPost, dataGet]) 


    return(
        <div className='post-container'> 
            {
                !estado ? (
                    <div div className='post-container-box'>
                        <button className='post-container-box-btn' onClick={_clickEstado}>Novo Registro</button>
                    </div>
                ) : (
                    <div className='post-container-box'>
                            <input className='post-container-box-input' placeholder='Conta' type="text" onChange={(event) => setName(event.target.value)} />
                            <input className='post-container-box-input' placeholder='Valor em Reais' type="number" onChange={(event) => setValue(event.target.value)} />

                            <input type="radio" className='post-container-box-radio' onChange={handleChange} name="postStatus" value="Saida" defaultChecked/> Saida
                            <input type="radio" className='post-container-box-radio' onChange={handleChange} name="postStatus" value="Entrada" /> Entrada

                            <button className='post-container-box-btn' onClick={_click}>Save</button>
                    </div>
                )
            }

            <button className='post-container-logout' onClick={_logout}>Sair</button>
        </div>
    );
}


export default PostConta;