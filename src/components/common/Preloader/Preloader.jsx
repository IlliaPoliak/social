import React from 'react';
import s from './Preloader.module.css'
import loading from '../../../img/loader.gif' 

const Preloader = () => (
    <div className={s.loader_wrapper} >
        <img className={s.loader} src={loading} alt="loading..."/>
    </div>
)

export default Preloader;