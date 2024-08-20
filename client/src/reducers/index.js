import { combineReducers } from 'redux';
import authReducer from '../redux/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
