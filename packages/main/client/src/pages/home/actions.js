import axios from '@utils/axios';
import * as constant from './actionsTypes';

// 自定义1
const Test = (data) => ({
	type: constant.FETCH_TEST,
	data,
});
export const fetchTestAction = (data) => (dispatch) => {
	dispatch(Test(data));
};

// formList
export const tempActionDispatchFormList = (params, callback) => ({
	actionTypePrefix: constant.FETCH_FORM_LIST_TEMPLATES,
	request: axios.get(`${BASE_URL}/page/form/list`, {
		params,
	}),
	callback,
});

// tableList
export const tempActionDispatchTableList = (params, callback) => ({
	actionTypePrefix: constant.FETCH_TABLE_LIST_TEMPLATES,
	request: axios.get(`${BASE_URL}/page/table/list`, {
		params,
	}),
	callback,
});
