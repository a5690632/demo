import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
function* fetchUser() {
    const data = yield axios.get("/mock/data.json");
    let action = {
        type: "add",
        value: data.data.data.message
    };
    yield put(action);
}

export default function* mySagas() {
    yield takeEvery("set", fetchUser);
}
