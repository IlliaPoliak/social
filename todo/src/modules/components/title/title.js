import React from 'react';
import PropTypes from 'prop-types';
import './title.css';

const Title = ({ title }) => (
   <h2 className='title'>{title}</h2>
);

Title.propTypes = {
    title: PropTypes.string
}

Title.defaultProps = {
    title: 'Default title'
}

export default Title;