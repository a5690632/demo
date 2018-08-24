import {createStore} from 'redux'
import reducer from '../reducer/reducer' 
const initValue={
   num:1
}
const store=createStore(reducer,initValue)
export default store