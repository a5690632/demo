import React, { Component } from "react";
import "./index.less";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class Head extends Component {
    constructor(props) {
        super(props);
        console.log(props.value);
    }
    render() {
        return (
            <div className="head">
                <div onClick={this.home}>HOME</div>
                <div onClick={this.detail}>DETAIL</div>
            </div>
        );
    }
    home = () => {
        this.props.history.push({
            pathname: "/",
            query: {
                id: 1
            }
        });
    };
    detail = () => {
        this.props.history.push({
            pathname: "/detail",
            query: {
                id: 2
            }
        });
    };
}

const mapStateToProps = state => ({
    value: state.Head.value
});

const mapDispatchToProps = () => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Head)
);
