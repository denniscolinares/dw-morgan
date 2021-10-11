import code from 'crypto-js';

const content = window.document.getElementsByTagName('meta').keywords.getAttribute('content');

const codify = {
    encode: (value) => {
        return code.AES.encrypt(value || '', content).toString();
    },
    decode: (value) => {
        return code.AES.decrypt(value || '', content).toString(code.enc.Utf8);
    },
};

export default codify;
