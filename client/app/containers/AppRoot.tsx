import * as React from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {AppPage} from './AppPage';
import {theme} from '../../common/theme/theme';
// @ts-ignore
import ReactNotification from 'react-notifications-component';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {appReducer} from '../reducers/app_reducer';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {logger} from 'redux-logger';
import {socketManager} from '../utils/socket';

const middlewares: any[] = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(appReducer, applyMiddleware(...middlewares));

socketManager.initialize(store.dispatch, store.getState);

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        letter-spacing: 0.105em;
        line-height: 1.5;
    }
    #app {
        display: flex;
        flex-direction: row;
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100wv;
    }
`;

export class AppRoot extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <ReactNotification/>
                        <BrowserRouter>
                            <AppPage/>
                        </BrowserRouter>
                        <GlobalStyle/>
                    </React.Fragment>
                </ThemeProvider>
            </Provider>
        );
    }
}
