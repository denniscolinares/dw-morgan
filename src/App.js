import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import codify from './library/codify';

import { AuthContext } from './components/Auth/auth';
/*import PrivateRoute from './components/PrivateRoute';*/
import PublicRoute from './components/PublicRoute';

import IndexPage from './pages/Index';
import Error404Page from './pages/Error/404/404';

import urls from './utility/urls';

const App = (props) => {
    const [authTokens, setAuthTokens] = useState(codify.decode(localStorage.getItem('tokens')));

    const setTokens = (data) => {
        if (data === undefined) {
            localStorage.removeItem('tokens');
            localStorage.removeItem('profiles');
            /*localStorage.clear();*/
        } else {
            localStorage.setItem('tokens', codify.encode(JSON.stringify(data)));
        }
        setAuthTokens(data);
    };

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <SnackbarProvider maxSnack={4} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Router forceRefresh={false} keyLength={12}>
                    <Switch>
                        <PublicRoute path={urls.PG_INDEX_PAGE} component={IndexPage} />
                        {/*<PrivateRoute path={urls.ADMIN_PAGE} component={AdminPage} />*/}
                        <Redirect
                            exact
                            from={urls.INDEX_PAGE}
                            to={{ pathname: urls.LOGIN_PAGE, state: { referer: props.location } }}
                        />
                        <Route component={Error404Page} />
                    </Switch>
                </Router>
            </SnackbarProvider>
        </AuthContext.Provider>
    );
};

export default connect()(App);
