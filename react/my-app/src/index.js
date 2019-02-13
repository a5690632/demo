import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

function Index() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<Index />, document.getElementById("root"));
