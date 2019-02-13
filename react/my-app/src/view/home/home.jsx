import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match);
    }
    render() {
        return <div>HOME</div>;
    }
}

export default Home;
