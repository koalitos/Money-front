import React, { useEffect, useContext } from 'react';
import { ContasContext } from '../Contexts/Contas'
const axios = require('axios');

const GetConta = () => {
    const { resposta, setResposta, setDataDelete } = useContext(ContasContext)

    const _recValues = () => {
        if (!resposta) {
            return
        }

        setResposta(resposta)
    }

    const _deleteConta = (id) => {
        if (!id) {
            return
        }

        axios.delete(`http://localhost:8888/conta/${id}`)
            .then((response) => {
                setDataDelete(response)
            })
    }

    useEffect(() => {
        _recValues()
    }, [resposta]);

    return (
        <div className='get-container'> 
            <h2 className='get-container-title'>Olá {localStorage.getItem('user')}</h2>

            {
                resposta 
                ? (
                    resposta.map(obj => (
                        <div className={`get-container-box ${obj.type}`}>
                            <span className='get-container-box-span'>
                                <p className='get-container-box-name'>Nome: {obj.name}</p>
                                <p className='get-container-box-name'>Valor: {obj.value}</p>
                                <p className='get-container-box-name'>Tipo: {obj.type}</p>
                                <p className='get-container-box-name'>Data: {obj.month}/{obj.year}</p>
                                {console.log(obj)}
                                <button 
                                    className='get-container-box-btn'
                                    onClick={() => _deleteConta(obj._id)} 
                                    value={obj._id}> 
                                        Delete 
                                    </button>
                            </span>
                        </div>
                    ))
                )
                : (<p>Nada Informado</p>)
            }    
        </div>
    );
};

export default GetConta;