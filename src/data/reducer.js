import { SET_DATA_UNIT, SET_DATA_COMPONENT, SET_DATA_DOMAIN, SET_DATA_COMPLETE } from "./constants";



const initState = []

function reducer(state, action) {
    switch(action.type) {
        case SET_DATA_UNIT:
            return action.payload;
        case SET_DATA_COMPONENT:
            return action.payload
        case SET_DATA_DOMAIN:
            return action.payload;
        case SET_DATA_COMPLETE:
            return action.payload;
        default:
            throw new Error('Invalid require')
    }

}

export { initState }
export default reducer