import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'; 
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,  
  document.getElementById('root')
);

// Activamos el service worker para que la app funcione sin conexión
serviceWorkerRegistration.register();

reportWebVitals();

