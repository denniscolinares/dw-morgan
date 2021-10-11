import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import {Backdrop, CircularProgress} from '@material-ui/core';
import {useSnackbar} from 'notistack';

import {Input} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

import _ from "lodash";

import api from "../../library/api";

import './style.scss';


const scoreMapping = [
	{
		label: "very weak",
		color : "weak"
	},
	{
		label: "weak",
		color : "vweak"
	},
	{
		label: "medium",
		color : "medium"
	},
	{
		label: "strong",
		color : "strong"
	},
	{
		label: "very strong",
		color : "vstrong"
	}
];

const LoginPage = (props) => {
	
	const [isLoading, setIsLoading] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [passStrength, setPassStrength] = useState({
		score : -1,
		guessTimeSeconds : 0,
		guessTimeString : "",
		warning : "",
		suggestions : []
	});
	
	const {enqueueSnackbar} = useSnackbar();
	
	useEffect(() => {
		
	}, []);
	
	useEffect(() => {
		if (passStrength.guessTimeString.length > 0) {
			setShowInfo(true);
		}
	}, [passStrength]);
	
	const delay = _.debounce((text) => {
		let data = {
			password : text
		};
		
		api.dwmorgan.passStrength(data)
				.then((resp) => {
					setPassStrength((prevState) => {
						return {...prevState, ...resp};
					});
				})
				.catch((err) => {
					enqueueSnackbar(err, {variant : 'error'});
				});
	}, 100);
	           
	return (
			<div id="main-page">
				
				<div className="container">
					<h1>Is your password <br/>strong enough?</h1>
					
					<Input.Password
							className="password-field"
							autoComplete="off"
							placeholder="Type a password"
							iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
							onChange={(e) => delay(e.target.value)}
					/>
					
					<ul className="score-progress">
						{
							scoreMapping.map((value, i) => (
									<li key={i} className={i <= passStrength.score? scoreMapping[passStrength.score].color : "" }>&nbsp;</li>
							))
						}
					</ul>
					
					<div id="info-panel" className={showInfo ? "show" : "hide"}>
						<h3>Your password is {`${passStrength.score >= 0 ? scoreMapping[passStrength.score].label : null}!`}</h3>
						<p>It will take {passStrength.guessTimeString} to guess your password. {passStrength.warning}</p>
						
						<ul>
							{passStrength.suggestions.map((value, index) => (
									<li key={index}>{value}</li>
							))}
						</ul>
					</div>
				</div>
				
				<Backdrop id="loading-dialog" open={isLoading}>
					<CircularProgress color="inherit"/>
				</Backdrop>
			</div>
	);
};

export default connect()(LoginPage);
