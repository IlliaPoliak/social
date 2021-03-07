import React from 'react';
import github from '../../img/github-512.png';
import s from './Footer.module.scss'
 

const Footer = () => (
    <footer className={s.footer} >
        <div className={s.more}>
            <a href='https://github.com/IlyaPolyak' target='_blank' rel="noopener noreferrer">
                <div>More on GitHub</div>
                <img src={github} alt="github"/>
            </a> 
        </div>
        <div className={s.copy}>
            &copy; 2019 Polyak Ilya
        </div>
    </footer>
)

export default Footer;