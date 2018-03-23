import * as actionType from '../actions/types.js';
import Immutable from 'immutable';

const defaultState = {
    payload:[],
};

const jobsReducer = (state = defaultState, action = {}) => {
    let imuData;
    let imuItem;
    switch(action.type) {
        case actionType.GET_ALL_JOBS:
            return {...state, ...action};
        case actionType.EDIT_SELECT_JOB:
            imuData = Immutable.List(state.payload);
            imuItem = Immutable.Map(state.payload[action.index]);
            imuData = imuData.set(action.index, imuItem);
            return {...state, ...{payload: imuData.toJS()}};
        default:
            return state;
    }
};

export default jobsReducer;