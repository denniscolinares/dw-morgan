import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../Auth/auth';
import urls from '../../utility/urls';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authTokens } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                authTokens ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: urls.LOGIN_PAGE, state: { referer: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
