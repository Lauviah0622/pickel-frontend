import { combineReducers } from 'redux';
import statusReducer from '../features/status/statusSlice'
import eventReducer from '../features/event/eventSlice';

export default combineReducers({
    statusState: statusReducer,
    eventState: eventReducer
})
