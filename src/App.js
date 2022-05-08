import React, { useEffect, useContext, lazy, Suspense } from 'react';

import './Components/css/App.css'

import {
  BrowserRouter,
  Routes,
  Navigate,
  Link,
  Route,
} from 'react-router-dom'


import GetConta from './Components/GetConta';
import PostConta from './Components/PostConta';
// import DeleteConta from './Components/DeleteConta';
import Total from './Components/Total';

import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { ContasContext } from './Contexts/Contas'

const axios = require('axios');

const App = () => {
  const { setResposta, dataGet, dataDelete, setDataPost } = useContext(ContasContext)
  const dateNow = new Date()

  const _getConta = () => {
    axios.get(`http://localhost:8888/conta?user=${localStorage.getItem('user')}&mes=${dateNow.getMonth()}&ano=${dateNow.getFullYear()}`)
      .then((response) => {
        setResposta(response.data);
        setDataPost(undefined)
      })
  }

  const PrivateRoute = ({ children, redirectTo }) => {
    let isAuth = localStorage.getItem('token') !== null
    isAuth = isAuth ? children : <Navigate to={redirectTo} />

    return isAuth
  }

  useEffect(() => {
    _getConta()
    setDataPost(undefined)
  }, [dataGet, dataDelete]);

  return(
      <BrowserRouter>
        <Routes> 
          <Route
            path="/home" 
            element={
            <PrivateRoute redirectTo="/">
              <PostConta />
              <GetConta />
              <Total />
            </PrivateRoute>
          } />
 
          <Route path="/" exact element={<Login />} />
          <Route path="/
          " exact element={<Register />} />
        </Routes>
      </BrowserRouter>
  )
};

export default App;