import axios from 'axios';
import _ from 'lodash';
import codify from './codify';

const env = () => {
	const data = [
		{
			name : 'localhost',
			value : 'o9etf82346.execute-api.us-east-1.amazonaws.com',
		}
	];
	const envdomain = window.location.hostname;
	return data.filter((value) => value.name === envdomain || '')[0].value;
};

const headersConfig = () => {
	let obj = {};
	const getTokens = codify.decode(localStorage.getItem('tokens'));
	
	obj = {
		"Authorization" : `Bearer ${String(getTokens).substring(1, getTokens.length - 1)}`,
		"Content-Type" : 'application/javascript'
	};
	
	return obj;
};

const http = axios.create({
	baseURL : `https://${env()}`,
	responseType : 'json',
	responseEncoding : 'utf8',
	headers : headersConfig(),
});

const utils = {
	getURL : function(path) {
		const loc = window.document.location;
		return loc.protocol + '//' + loc.host + (path || '');
	},
};

const mapping = {
	passStrength: function(data) {
		let defaultObj = {
			score : 0,
			guessTimeSeconds : 0,
			guessTimeString : "",
			warning : "",
			suggestions : []
		};
	
		return _.assign(defaultObj, data);
	}
};

const dwmorgan = {
	passStrength : function(data) {
		const dataDefault = {
					password : ""
				},
				newData = _.assign(dataDefault, data),
				opt = {
					url : "/staging/password/strength",
					method : "post",
					data : newData
				};
		
		let request = async function() {
			return await http(opt)
					.then((resp) => {
						return mapping.passStrength(resp.data);
					})
					.catch((err) => {
						return err.response.data;
					});
		};
		
		return request();
	}
};

export default {
	utils,
	dwmorgan,
};
