import React from 'react';
import ReactDOM, {hydrate, render } from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { HashRouter, BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const toRender = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  )

const rootElement = document.getElementById('root');

//ReactDOM.render(toRender, rootElement);

if (rootElement.hasChildNodes()){
  ReactDOM.hydrate(toRender, rootElement);
}else{
  ReactDOM.render(toRender, rootElement);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
