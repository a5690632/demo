import React, { Component } from "react";

function decorateSword(target, key, descriptor) {
  // 首先获取到 init 方法


  // const initMethod = descriptor.value
  // // 宝剑添加攻击力 100 点
  // let moreAtk = 100
  // let returnObj
  // descriptor.value = (...args) => {


  //   args[0] += moreAtk
  //   returnObj = initMethod.apply(target, args)
  //   return returnObj
  // }
}


@decorateSword
class Warrior {
  constructor(atk = 50, def = 50, hp = 100, mp = 100) {
    this.init(atk, def, hp, mp)

  }

  init(atk, def, hp, mp) {
    this.atk = atk
    this.def = def
    this.hp = hp
    this.mp = mp
  }

  toString() {
    return `攻击力:${this.atk}, 防御力: ${this.def}, 血量: ${this.hp}, 法力值: ${this.mp}`
  }
}


const Reaper = new Warrior()


class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "asd"
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
