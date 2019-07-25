import { createStore, combineReducers } from "redux";
import { HeadReducer } from "../component/head/store";




const reducer = combineReducers({
    Head: HeadReducer
});
const store = createStore(reducer);

export default store;