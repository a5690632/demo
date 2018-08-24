import React from 'react';
import { render } from 'react-dom';
import store from './redux/store/store'
import { Provider } from 'react-redux';
import Router from "./router/router"


render(
    <Provider store={store}>
        <Router></Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);