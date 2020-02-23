import {ThunkAction} from 'redux-thunk';
import {AppStore} from '../reducers/app_reducer';
import {Action} from 'redux';

export type AppThunkAction<R = void> = ThunkAction<R, AppStore, unknown, Action<string>>;
