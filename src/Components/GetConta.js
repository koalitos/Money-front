import React, { useState, useEffect } from 'react';
const axios = require('axios');

const GetConta = () => {
    const [resposta, setResposta] = useState('');
    const [value, setValue] = useState('');

    const onChange = event => {
        setValue(event.target.value);
    };

    const _getConta = () => {
        axios.get(`http://localhost:8888/conta`)
            .then((response) => {
                setResposta(response.data);
                console.log(resposta)
            })
    }

    useEffect(() => {
        _getConta()
    }, [value]);


    return (
        <div className="container">
            <input value={value} type="text" onChange={onChange} />

            {resposta ? (
                resposta.map(obj => (
                    <p>{obj.name}</p>
                ))
            ) :
            (<p>teste</p>)
           
            }
            

        </div>
    );
};


export default GetConta;