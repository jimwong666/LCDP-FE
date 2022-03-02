import * as constant from './actionsTypes';
import axios from '@utils/axios';

// fetch test
const Test = (data) => ({
	type: constant.FETCH_TEST,
	data,
});
export const fetchTestAction = (data) => (dispatch) => {
	dispatch(Test(data));
};

export const asyncCustomTestFetchAction = (params, callback) => ({
	actionTypePrefix: constant.FETCH_CUSTOMER_TEMPLATES,
	request: axios.get(`${BASE_URL}/api/page/form/list`, {
		params,
	}),
	callback,
});
