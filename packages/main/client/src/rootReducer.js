import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '@pages/home';
import { reducer as aboutReducer } from '@pages/about';

export default combineReducers({
	homeReducer,
	aboutReducer,
});
