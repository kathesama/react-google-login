import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate as ReduxProvider } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

import './index.css';

// eslint-disable-next-line
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxProvider persistor={persistor}>
        <App />
      </ReduxProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

/* If you want to start measuring performance in your app, pass a function
   to log results (for example: reportWebVitals(console.log))
   or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals */
reportWebVitals();
