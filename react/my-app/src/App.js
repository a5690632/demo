import React, {Component} from 'react';
import "./App.css"

import Head from "./head/head"
import Body from "./body/body"
import {
  Route,
  Link,
} from  "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <ul>
            <li>
                <Link to="/body">body</Link>
            </li>
            <li>
                <Link to="/head">head</Link>   
            </li> 
        </ul> 
        <Route path="/Head" component={Head}/> 
        <Route path="/body" component={Body}/> 
      </div>
    )
  }
}

export default App;