import * as actionType from '../actions/types.js';

const defaultCreateState = {
};

const jobCreateReducer = (state = defaultCreateState, action = {}) => {
    switch(action.type) {
        case actionType.CREATE_JOB:
            return {...state, ...action};
        default:
            return state;
    }
};

const defaultImageTagsState = {
    payload: [],
};

const jobImageTagsReducer = (state = defaultImageTagsState, action = {}) => {
    switch(action.type) {
        case actionType.GET_IMAGE_TAGS:
            return {...state, ...action};
        default:
            return state;
    }
};

const defaultJobDetailState = {
    payload: {},
};

const jobDetailReducer = (state = defaultJobDetailState, action = {}) => {
    switch(action.type) {
        case actionType.GET_JOB_DETAIL:
            return {...state, ...action};
        default:
            return state;
    }
};

export {jobCreateReducer, jobImageTagsReducer, jobDetailReducer};