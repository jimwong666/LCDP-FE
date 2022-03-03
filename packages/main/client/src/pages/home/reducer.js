import update from 'immutability-helper';
import { withAsyncReducer } from '@utils/reduxSimpleAsync';
import { combineReducers } from 'redux-immutable';
import * as constant from './actionsTypes';

// 自定义1
const testFetch = (
	state = {
		status: false,
		data: [],
		txt: 0,
	},
	action,
) => {
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

// formList
const tempReducerFetchFormList = withAsyncReducer(constant.FETCH_FORM_LIST_TEMPLATES, {
	isFetching: false,
	data: null,
});

// tableList
const tempReducerFetchTableList = withAsyncReducer(constant.FETCH_TABLE_LIST_TEMPLATES, {
	isFetching: false,
	data: null,
});

export default combineReducers({
	tempReducerFetchFormList,
	tempReducerFetchTableList,
	testFetch,
});
