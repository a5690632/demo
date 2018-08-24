import React, { Component } from 'react'

import { connect } from 'react-redux';

import Head from "./head/head"
import Body from "./body/body"


class App extends Component {
  render() {
    return (
      <div>
        <Head></Head>
        <Body></Body>
        <div>
          {this.props.value}
        </div>
      </div>
    )
  }
}




function mapState(state) {
  return {
    value: state.num
  }
}
function mapDispatch(dispatch) {
  return {
    add: () => {
      dispatch({type:"add"})
    },
    min: () => {
      dispatch({type:"min"})
    }
  }
}

export default connect(mapState, mapDispatch)(App)