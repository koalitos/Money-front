import React, { useState, useEffect, useContext } from 'react';
import { ContasContext } from '../Contexts/Contas'

const Total = () => {
    const { resposta } = useContext(ContasContext)
    const [sum, setSum] = useState('');

    const _sumValues = () => {
        if (!resposta) {
            return
        }

        const initialValue = 0;
        const arrPos = []
        const arrNeg = []

        resposta.map((obj) => {
            if (obj.type == 'Entrada') {
                arrPos.push(obj.value)
            }
            if (obj.type == 'Saida') {
                arrNeg.push(obj.value)
            }

        })

        const sumWithInitial = arrPos.reduce(
            (previousValue, currentValue) =>
                previousValue + currentValue,
            initialValue
        );

        const lessWithInitial = arrNeg.reduce(
            (previousValue, currentValue) =>
                previousValue + currentValue,
            initialValue
        );

        setSum(sumWithInitial - lessWithInitial)
    }

    useEffect(() => {    
        _sumValues()
    });

    return (
        <p className='total'>Total: R$ {sum} </p>
    )
};

export default Total;