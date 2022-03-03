import { combineReducers } from 'redux-immutable';
import update from 'immutability-helper';
import * as constant from './actionsTypes';

// 自定义1
const customTestFetchDefauleValue = {
	status: false,
	data: '',
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
