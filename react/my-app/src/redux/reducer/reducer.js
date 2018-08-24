

export default(state,action)=>{
    switch (action.type){
        case "add":
        return {...state,num:state.num+1}
        case "min":
        return {...state,num:state.num-1}
        default:
        return state
    }
}