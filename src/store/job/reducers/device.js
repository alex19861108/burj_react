import * as actionType from "../actions/types";

const defaultState = {
    payload:[],
};

const deviceReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case actionType.GET_ALL_DEVICES:
            return {...state, ...action};
        default:
            return state;
    }
};

export default deviceReducer;