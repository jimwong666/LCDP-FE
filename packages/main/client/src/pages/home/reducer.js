import update from 'immutability-helper';
import { withAsyncReducer } from '@utils/reduxSimpleAsync';
import { combineReducers } from 'redux-immutable';
import * as constant from './actionsTypes';

// 自定义1
const customTestFetchDefauleValue = {
	status: false,
	data: [],
	txt: 0,
};
const testFetch = (state = customTestFetchDefauleValue, action) => {
	switch (action.type) {
		case constant.FETCH_TEST:
			return update(state, {
				$set: {
					status: !state.status,
					txt: action.data.txt,
				},
			});
		default:
			return state;
	}
};

const customTestFetch = withAsyncReducer(constant.FETCH_CUSTOMER_TEMPLATES, {
	isFetching: false,
	data: null,
});

export default combineReducers({
	customTestFetch,
	testFetch,
});
