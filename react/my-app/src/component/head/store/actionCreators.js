import * as constants from "./constants";

export const ADD = () => {
    return {
        type: constants.ADD
    };
};
export const MIN = () => {
    return {
        type: constants.MIN
    };
};
export const home = (data, data1) => {
    console.log(data, data1)
    return {
        type: constants.HOME,

    };
};