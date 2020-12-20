import { combineReducers } from 'redux';
import statusReducer from '../features/status/statusSlice'
import eventReducer from '../features/event/eventSlice';
import pickReducer from '../features/pick/pickSlice';

export default combineReducers({
    statusState: statusReducer,
    eventState: eventReducer,
    pickState: pickReducer
})
