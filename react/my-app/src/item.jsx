import React, { Component } from "react";
import PropTypes from "prop-types";

export class Item extends Component {
    static propTypes = {
        item: PropTypes.string,
        index: PropTypes.number,
        del: PropTypes.func
    };

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div onClick={() => this.del(this.props.index)}>
                {this.props.item}
            </div>
        );
    }
    del(index) {
        this.props.del(index);
    }
}

export default Item;
