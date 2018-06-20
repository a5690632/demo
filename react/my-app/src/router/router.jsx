import {
    Route,
    HashRouter
} from "react-router-dom";
import React, { Component } from 'react';

import App from '../App';



class router extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={App} />
                </div>
            </HashRouter>
        )
    }
}
export default router