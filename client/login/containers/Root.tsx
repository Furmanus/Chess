import * as React from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {theme} from '../../common/theme/theme';
import {LoginPage} from './LoginPage';
import {createStore} from 'redux';
import {loginPageReducer} from '../reducers/reducer';
import {Provider} from 'react-redux';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        line-height: 1.5;
    }
    #app {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 30px;
        max-width: 450px;
        height: 100vh;
    }
`;

const store = createStore(loginPageReducer);

export class Root extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <LoginPage/>
                        <GlobalStyle/>
                    </React.Fragment>
                </ThemeProvider>
            </Provider>
        );
    }
}
