import React from 'react';
import './../input/input.css';
import Info from './../info/info';

const Input = props => (
	<form onSubmit={props.weatherMethod} className='form'>
		<input type='text' name='city' placeholder='City' className='input-city' />
		<button className='get-btn'>Get Weather</button>
		<Info  info={props.info}/>
	</form>
);

export default Input;