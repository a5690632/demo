import {
    HashRouter,
    Route,
  } from 'react-router-dom'
import React, { Component } from 'react';
import Head from "../head/head"
import Body from "../body/body"
import App from '../App';



class router extends Component {
    render() {
        return (
            <HashRouter>
                <Route path='/' component={App}>
                    <Route path='head' component={Head} />
                    <Route path='body' component={Body} />
                </Route>
            </HashRouter>
        )
    }
}
export default router