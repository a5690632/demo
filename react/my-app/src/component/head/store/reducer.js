import * as constants from "./constants";
const initialState = {
    value: 1
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.ADD:
            let newState = JSON.parse(JSON.stringify(state));
            newState.value++;
            return newState;
        case constants.MIN:
            let value = --state.value;
            return { ...state, value };
        case constants.HOME:
            console.log(1)
            return { ...state };
        default:
            return state;
    }
};