import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';

const FILTERS_BTN = [
    {
        id: 'all',
        text: 'All'
    },
    {
        id: 'active',
        text: 'Active'
    },
    {
        id: 'completed',
        text: 'Completed'
    }
]

const Footer = ({ activeFilter, changeFilter }) => (
    <div className='footer'>
        <div className='btn-group'>
            {FILTERS_BTN.map(({text, id}) => {
                return <button 
                onClick={()=>{changeFilter(id)}}
                key={id}
                className={ id === activeFilter ? 'filter-btn active' : 'filter-btn'}
                >{text}</button>
            })}
        </div>
    </div>
);

Footer.propTypes = {
    activeFilter: PropTypes.string,
    changeFilter: PropTypes.func,
}

Footer.defaultProps = {
    activeFilter: 'all',
    changeFilter: () => {},
}

export default Footer;