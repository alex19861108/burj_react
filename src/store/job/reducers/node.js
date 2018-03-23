import * as actionType from "../actions/types";

const defaultState = {
    payload:[],
};

const nodeReducer = (state = defaultState, action = {}) => {
    switch(action.type) {
        case actionType.GET_ALL_NODES:
            return {...state, ...action};
        default:
            return state;
    }
};

const defaultNodeDetailState = {
    payload: {},
};
const nodeDetailReducer = (state = defaultNodeDetailState, action = {}) => {
    switch(action.type) {
        case actionType.GET_NODE_DETAIL:
            return {...state, ...action};
        default:
            return state;
    }
};

export {nodeReducer, nodeDetailReducer};