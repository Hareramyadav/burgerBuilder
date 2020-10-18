import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layout extends Component{

    state={
        showSideDrawer:false,
    }

    closeSidedrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    openSideDrawerMenuHandler=(prevState)=>{
        return this.setState({showSideDrawer:!prevState.showSideDrawer});
    }

    render(){
        return(
            <Aux>
                <Toolbar
                    isAuth={this.props.isAutenticated}
                    openMenu={this.openSideDrawerMenuHandler}/>
                <SideDrawer
                    isAuth={this.props.isAutenticated} 
                    open={this.state.showSideDrawer} 
                    close={this.closeSidedrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);

/* since navigationItems is not class based component, so we cannot use redux.
so we can manage navigation from layout */