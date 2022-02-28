import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '@pages/home';

export default combineReducers({
	homeReducer,
});
