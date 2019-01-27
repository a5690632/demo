import React, { Component } from "react";

import "./App.css";

class App extends Component {
    constructor() {
        super();
    }
    render() {
        return <div className="App" onClick={this.haha} />;
    }
    haha() {
        console.log(1);
    }
}

export default App;
