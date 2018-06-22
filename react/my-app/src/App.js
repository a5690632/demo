import React, { Component } from 'react';
import "./App.css"


import { connect } from 'react-redux'


function mapDispatchToprops (dispatch) {
  return {
      add:function(){
       
      },
      min: () => dispatch("min")
  };
}

const mapStateToProps = state=> {

  return {
    num: state
  };
}


class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          {this.props.num}
        </div>
        <button onClick="{this.props.add}">+</button>
        <button onClick="{this.props.min}">-</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(App);
