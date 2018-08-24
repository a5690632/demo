import React, { Component } from 'react'

import { connect } from 'react-redux';
export class body extends Component {
  render() {

    return (
        <div>
            <button onClick={this.props.min}>+</button>
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
  min: () => {
    dispatch({type:"min"})
  },
 

}
}

export default connect(mapState, mapDispatch)(body)
