import React from 'react';
import burgerLogo from '../../assets/images/original.png';
import classes from './Logo.module.css';

const logo = ()=>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='logo'/>
    </div>
);

export default logo;
