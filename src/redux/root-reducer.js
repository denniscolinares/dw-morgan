import { combineReducers } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';

let reducers = {
    form: reduxFormReducer,
};

export default combineReducers(reducers);
