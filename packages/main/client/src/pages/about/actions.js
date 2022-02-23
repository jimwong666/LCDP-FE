import axios from '@utils/axios';
import * as constant from './actionsTypes';

/**
 * 获取页面初始数据
 * */
const fetchPreDataRequest = () => ({
	type: constant.FETCH_PRE_DATA_REQUEST,
});

const fetchPreDataSuccess = (data) => ({
	type: constant.FETCH_PRE_DATA_SUCCESS,
	data,
});

const fetchPreDataFailure = (error) => ({
	type: constant.FETCH_PRE_DATA_FAILURE,
	error,
});

export const asyncFetchPreDataAction = (callback) => (dispatch) => {
	dispatch(fetchPreDataRequest());
	axios
		.get(`${BASE_URL}/api/imgList`)
		.then(function (res) {
			if (res.data) {
				dispatch(fetchPreDataSuccess(res.data));
				callback && callback(res.data);
			}
		})
		.catch((error) => {
			dispatch(fetchPreDataFailure(error));
		});
};

// 一样的
export const asyncFetchPreDataAction2 = (callback) => ({
	actionTypePrefix: constant.FETCH_CUSTOMER_TEMPLATES,
	request: axios.get(`${BASE_URL}/api/imgList`),
	callback,
});
