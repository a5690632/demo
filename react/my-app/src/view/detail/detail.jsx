import React, { Component } from "react";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    render() {
        return <div onClick={this.click}>{this.state.value}</div>;
    }
    static getDerivedStateFromProps(props, state) {
        return state;
    }
    click = () => {
        this.setState(() => ({
            value: 2
        }));
    };
}
export default Detail;
