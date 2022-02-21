import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Main } from 'Modules/Main';
import { store } from 'Stores/store';

import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
