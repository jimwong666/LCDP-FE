import update from 'immutability-helper';
import { combineReducers } from 'redux-immutable';
import * as constant from './actionsTypes';

// 自定义1
const customTestFetchDefauleValue = {
	status: false,
	data: [0, 1, 2, 3],
};
const customTestFetch = (state = customTestFetchDefauleValue, action) => {
	switch (action.type) {
		case constant.FETCH_TEST:
			return update(state, {
				$set: {
					status: !state.status,
					txt: action.data,
				},
			});
		default:
			return state;
	}
};

export default combineReducers({
	customTestFetch,
});
