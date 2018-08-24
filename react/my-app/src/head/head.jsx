import React, { Component } from 'react';
import "./head.css"
import { Button } from 'antd';
import { connect } from 'react-redux';



class head extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

 
    render() {
        console.log(this.props)
        return (
            <div>
                <button onClick={this.props.add}>+</button>
            </div>
        )
    }
}



function mapState(state) {

    return {
     
    }
  }
  function mapDispatch(dispatch) {
  
    return {
      add: () => {
        dispatch({type:"add"})
      },
     
  
    }
  }
  
  export default connect(mapState, mapDispatch)(head)
