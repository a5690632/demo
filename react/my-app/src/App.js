import React, { Component } from "react";
import { connect } from "react-redux";
import Head from "./component/head";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./view/home/home";
import Detail from "./view/detail/detail";
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Head />
                    <div>
                        <Route path="/home" component={Home} />
                        <Route path="/detail" component={Detail} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
