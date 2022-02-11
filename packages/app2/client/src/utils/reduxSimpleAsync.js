import update from 'immutability-helper';

// actionType后缀
const REQUEST_BEGIN_SUFFIX = 'REQUEST';
const REQUEST_SUCCESS_SUFFIX = 'SUCCESS';
const REQUEST_FAILURE_SUFFIX = 'FAILURE';

/**
 * 异步请求中间件
 * 如果有request的话说明是异步请求
 * 使用：xxxAction({actionTypePrefix: 'XXX_XX', request: Axios.get("xxx", {params})})
 * */
const simpleAsync =
	({ dispatch }) =>
	(next) =>
	(action) => {
		// console.log("开始开始开始开始开始开始开始开始开始开始开始");
		// console.log("next:"+next);
		// console.log("action:"+JSON.stringify(action));
		const { actionTypePrefix, request, callback } = action;
		if (request) {
			dispatch({
				type: `${actionTypePrefix}_${REQUEST_BEGIN_SUFFIX}`,
			});
			return request
				.then((res) => {
					dispatch({
						type: `${actionTypePrefix}_${REQUEST_SUCCESS_SUFFIX}`,
						data: res.data,
					});
					callback && callback(res.data);
				})
				.catch((error) => {
					dispatch({
						type: `${actionTypePrefix}_${REQUEST_FAILURE_SUFFIX}`,
						error,
					});
				});
		}
		next(action);
		// console.log("结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束");
		return null;
	};

/**
 * 异步请求高阶reducer
 * @params {String} actionTypePrefix actionType前缀
 * @params {String} initialState 初始state
 * @params {Function} wrappedReducer 自定义的reducer（其它需要处理当前state的reducer）
 * @returns {Function} 返回了一个处理过的高阶reducer函数（其实就是加上异步请求的三种情况）
 * */
export const withAsyncReducer =
	(
		actionTypePrefix,
		initialState = {
			isFetching: false,
			data: null,
		},
		wrappedReducer,
	) =>
	(state = initialState, action) => {
		switch (action.type) {
			case `${actionTypePrefix}_${REQUEST_BEGIN_SUFFIX}`:
				return update(state, {
					$set: {
						isFetching: true,
					},
				});
			case `${actionTypePrefix}_${REQUEST_SUCCESS_SUFFIX}`:
				return update(state, {
					$set: {
						isFetching: false,
						data: action.data,
					},
				});
			case `${actionTypePrefix}_${REQUEST_FAILURE_SUFFIX}`:
				return update(state, {
					$set: {
						isFetching: false,
					},
				});
			default:
				if (wrappedReducer) {
					return wrappedReducer(state, action);
				}
				return state;
		}
	};

export default simpleAsync;
