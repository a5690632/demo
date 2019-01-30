import React, { Component } from "react";
import Item from "./item";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            input: ""
        };
    }
    render() {
        return (
            <div>
                <input
                    value={this.state.input}
                    onChange={this.shuru}
                    onKeyUp={this.add}
                />

                {this.state.list.map((item, index) => {
                    return (
                        <Item
                            item={item}
                            del={this.del}
                            index={index}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }
    shuru = e => {
        let value = e.target.value;
        this.setState((state, props) => {
            return { input: value };
        });
    };
    add = () => {
        let list = [...this.state.list];
        list.push(this.state.input);
        this.setState(() => {
            return {
                input: "",
                list
            };
        });
    };
    del = index => {
        let list = [...this.state.list];
        list.splice(index, 1);
        this.setState(() => {
            return { list };
        });
    };
}

export default App;
