import { combineReducers } from 'redux';
import requestFormReducer from './requestFormReducer';


export default combineReducers({
    requestForm: requestFormReducer
});