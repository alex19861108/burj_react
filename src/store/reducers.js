import { combineReducers } from 'redux';
import jobReducer from './job/reducers/index.js';
import {jobCreateReducer, jobImageTagsReducer, jobDetailReducer} from './job/reducers/job.js';
import {nodeReducer, nodeDetailReducer} from './job/reducers/node.js';
import deviceReducer from './job/reducers/device.js';


const appReducer = combineReducers({
    jobReducer: jobReducer,
    jobCreateReducer: jobCreateReducer,
    jobImageTagsReducer: jobImageTagsReducer,
    jobDetailReducer: jobDetailReducer,
    nodeReducer: nodeReducer,
    deviceReducer: deviceReducer,
    nodeDetailReducer: nodeDetailReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;