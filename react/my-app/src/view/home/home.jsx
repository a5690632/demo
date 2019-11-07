import React, { Component } from "react";
import { connect } from "react-redux"
import { home } from "../../component/head/store/actionCreators"

@connect(
  null,
  { home }
)
class Home extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return <div onClick={() => this.props.home(123, 1)}>HOME</div>;
  }
}

export default Home;
