import codify from './codify';
import cookie from 'js-cookie';
import _ from 'lodash';

const storage = (value) => {
    const name = '_ga_so',
        defAttr = {
            domain: document.location.hostname,
            path: '/',
            expires: 3,
            secure: true,
        },
        defData = {},
        data = _.extend(cookie.get());

    return cookie.set(name, codify.encode('adadasdsadas'), defAttr);
};

export default storage;
