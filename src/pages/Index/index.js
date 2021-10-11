import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import urls from '../../utility/urls';

import MainPage from '../Main';

import Error404Page from '../Error/404/404';

import './style.scss';

const IndexPage = (props) => {
    let location = useLocation();

    return (
        <div id="public-layout">
            <div id="content">
                <Switch location={location}>
                    <Route exact path={urls.LOGIN_PAGE} component={MainPage} />
                    <Route component={Error404Page} />
                </Switch>
            </div>
        </div>
    );
};

export default connect()(IndexPage);
