import React, {useState, createContext} from "react";
export const ContasContext = createContext();

export const ContasProvider = (props) => {
    const [resposta, setResposta] = useState('');
    const [dataPost, setDataPost] = useState()
    const [dataGet, setDataGet] = useState()
    const [dataDelete, setDataDelete] = useState()
    const [dataPath, setDataPath] = useState()

    return(
        <ContasContext.Provider value=
        {{ 
            resposta, setResposta,
            dataPost, setDataPost,
            dataGet, setDataGet,
            dataDelete, setDataDelete,
            dataPath, setDataPath
        }}>
            
            {props.children}
        </ContasContext.Provider>
    );
}
