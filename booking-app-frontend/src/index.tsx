import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './context/store';
import App from './main/App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
