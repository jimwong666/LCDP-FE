import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '@pages/home';
import { reducer as workReducer } from '@pages/work';

export default combineReducers({
	homeReducer,
	workReducer,
});
