import update from 'immutability-helper';
import { combineReducers } from 'redux-immutable';
import { withAsyncReducer } from '@utils/reduxSimpleAsync';
import * as constant from './actionsTypes';

// 获取页面初始数据
const preData = (
	state = {
		isFetching: false,
		data: [],
	},
	action,
) => {
	switch (action.type) {
		case constant.FETCH_PRE_DATA_REQUEST:
			return update(state, {
				$set: {
					isFetching: true,
				},
			});
		case constant.FETCH_PRE_DATA_SUCCESS:
			return update(state, {
				$set: {
					isFetching: false,
					data: action.data,
				},
			});
		case constant.FETCH_PRE_DATA_FAILURE:
			return update(state, {
				$set: {
					isFetching: false,
				},
			});
		default:
			return state;
	}
};

const preData2 = withAsyncReducer(constant.FETCH_CUSTOMER_TEMPLATES, {
	isFetching: false,
	data: [],
});

export default combineReducers({
	preData,
	preData2,
});
