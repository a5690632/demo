import {
    createStore
} from 'redux'

const initialState = {
    num: 1
}



const reducers = (state=initialState, action) => {
    var state1 = Object.assign({}, state)
    switch (action.type) {
        case 'add':
            state1.num = state1.num + 1
            return state1
        case 'min':
            state1.num = state1.num - 1
            return state1
    }

}


const store = createStore(reducers)

export default store