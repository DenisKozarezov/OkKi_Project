import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Main from './pages/main/Main';

import { ImgProvider } from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <ImgProvider>
      <Main></Main>
    </ImgProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
