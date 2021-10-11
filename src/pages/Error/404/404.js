import React from 'react';
import { useHistory } from 'react-router-dom';

import { Result, Button } from 'antd';

import urls from '../../../utility/urls';

import './styles.scss';

const NotFoundPage = () => {
    const historyLink = useHistory();

    const onClickHome = () => {
        historyLink.push(urls.LOGIN_PAGE);
    };

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button onClick={onClickHome} type="primary">
                    Back Home
                </Button>
            }
        />
    );
};

export default NotFoundPage;
