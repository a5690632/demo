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
          <Head initialState={
            "1"
          } />
          <Home></Home>
          <Detail></Detail>
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
