import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStore} from '../reducers/app_reducer';
import {AppActionTypes} from '../actions/app_action_types';

export type AppThunkAction<R = void> = ThunkAction<R, AppStore, undefined, AppActionTypes>;
export type AppThunkDispatch = ThunkDispatch<AppStore, void, AppActionTypes>;
