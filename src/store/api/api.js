import Server from './server';

class API extends Server {
    /**
     *  用途：获取Jobs数据
     *  @url http://{host}:{port}/job
     *  返回http_code为200表示成功
     *  @method get
     *  @return {promise}
     */
    async getAllJobs(params = {}) {
        try {
            let result = await this.axios('get', `/job`);
            if (result && (result instanceof Object)) {
                return result || [];
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/job',
                    };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }

    async createJob(params = {}) {
        try {
            let result = await this.axios('post', `/job/create`, {params:params});
            if (result && (result instanceof Object)) {
                return result || [];
            } else {
                let err = {
                    tip: '创建任务失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/job/create',
                };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }

    async getImageTags(params) {
        try {
            let result = await this.axios('get', `/job/image/tags`);
            if (result && (result instanceof Object)) {
                var res = result.map(function(item){
                    return {"label":item.mark, "value": item.mark}
                });
                return res;
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/job/image/tags',
                };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }

    async getJobDetail(params) {
        try {
            let result = await this.axios('get', `/job/`+params);
            console.log(result);
            if (result && (result instanceof Object)) {
                return result
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/job/detail',
                };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }

    async getAllNodes(params = {}) {
        try {
            let result = await this.axios('get', `/node`);
            if (result && (result instanceof Object)) {
                return result || [];
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/node',
                };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }

    async getNodeDetail(params) {
        try {
            let result = await this.axios('get', `/node/`+params);
            if (result && (result instanceof Object)) {
                return result
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/node/detail',
                };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }

    async getAllDevices(params = {}) {
        try {
            let result = await this.axios('get', `/device`);
            if (result && (result instanceof Object)) {
                return result || [];
            } else {
                let err = {
                    tip: '获取记录数据失败',
                    response: result,
                    data: params,
                    url: 'http://{host}:{port}/device',
                };
                throw err;
            }
        } catch (err) {
            throw err;
        }
    }
}

export default new API();