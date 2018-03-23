import * as actionType from './types.js';
import API from '../../api/api.js';

export const getAllJobs = () => {
    return async dispatch => {
        try {
            let result = await API.getAllJobs();
            result.map(item => {
                return item;
            });
            dispatch({
                type: actionType.GET_ALL_JOBS,
                payload: result,
            })
        } catch (err) {
            dispatch({
                type: actionType.GET_ALL_JOBS,
                payload: err,
                error: true,
            });
        }
    };
};

export const createJob = (params) => {
    return async dispatch => {
        try {
            let result = await API.createJob(params);
            dispatch({
                type: actionType.CREATE_JOB,
                payload: result,
                meta: {
                    //redirectTo: '/job/' + result.id,
                    redirectTo: '/job/show',
                }
            });
        } catch (err) {
            dispatch({
                type: actionType.CREATE_JOB,
                payload: err,
                error: true,
            });
            console.error(err);
        }
    };
};

export const getImageTags = (params) => {
    return async dispatch => {
        try {
            let result = await API.getImageTags(params);
            dispatch({
                type: actionType.GET_IMAGE_TAGS,
                payload: result,
            })
        } catch (err) {
            dispatch({
                type: actionType.GET_IMAGE_TAGS,
                payload: err,
                error: true,
            });
            console.error(err);
        }
    };
};

export const getJobDetail = (params) => {
    return async dispatch => {
        try {
            let result = await API.getJobDetail(params);
            dispatch({
                type: actionType.GET_JOB_DETAIL,
                payload: result,
            })
        } catch (err) {
            dispatch({
                type: actionType.GET_JOB_DETAIL,
                payload: err,
                error: true,
            });
            console.error(err);
        }
    };
};

export const getAllNodes = () => {
    return async dispatch => {
        try {
            let result = await API.getAllNodes();
            result.map(item => {
                return item;
            });
            dispatch({
                type: actionType.GET_ALL_NODES,
                payload: result,
            })
        } catch (err) {
            dispatch({
                type: actionType.GET_ALL_NODES,
                payload: err,
                error: true,
            });
        }
    };
};

export const getNodeDetail = (params) => {
    return async dispatch => {
        try {
            let result = await API.getNodeDetail(params);
            dispatch({
                type: actionType.GET_NODE_DETAIL,
                payload: result,
            })
        } catch (err) {
            dispatch({
                type: actionType.GET_NODE_DETAIL,
                payload: err,
                error: true,
            });
            console.error(err);
        }
    };
};

export const getAllDevices = () => {
    return async dispatch => {
        try {
            let result = await API.getAllDevices();
            dispatch({
                type: actionType.GET_ALL_DEVICES,
                payload: result,
            })
        } catch (err) {
            dispatch({
                type: actionType.GET_ALL_DEVICES,
                payload: err,
                error: true,
            });
        }
    };
};