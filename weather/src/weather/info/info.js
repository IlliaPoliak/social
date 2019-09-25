import React from 'react';
import './../info/info.css'

const Info = props => (
	<div>
		{props.info.city &&
			<div className='params-info'>
				<p>City: {props.info.city}</p>
				<p>Temperature: {props.info.temp}</p>
				<p>Sunrise: {props.info.sunrise}</p>
				<p>Sunset: {props.info.sunset}</p>
				<p>Wind speed: {props.info.wind}</p>
			</div>
		}
		<p className='error-info'>{props.info.error}</p>
	</div>
);

export default Info;