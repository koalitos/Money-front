import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContasProvider } from './Contexts/Contas'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContasProvider>
      <App />
    </ContasProvider>
  </React.StrictMode>
);

