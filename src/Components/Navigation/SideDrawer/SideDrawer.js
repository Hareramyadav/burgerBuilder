import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


const sideDrawer =(props)=>{
    let hideSidedrawer =[classes.SideDrawer, classes.Close];
    if(props.open){
        hideSidedrawer =[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.open} click_to_remove_modal={props.close}/>
            <div className={hideSidedrawer.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
                
            </div>
        </Aux>
    );
}

export default sideDrawer;