import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Main } from 'Modules/Main';
import { store } from 'Stores/store';

import reportWebVitals from './reportWebVitals';
import './i18n';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
const app = (
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <Provider store={store}>
        <Main />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);

root.render(app);

reportWebVitals();
