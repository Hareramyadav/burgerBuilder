import React, {Component} from 'react';
import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Toolbar from './Components/Navigation/Toolbar/Toolbar';
import Checkout from './Containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './Containers/Checkout/Orders/Orders';
import Auth from './Containers/Auth/Auth';

class App extends Component{
  render(){
    return(
        <div>
          <Toolbar/>
          <Layout>
            <Switch>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/auth' component={Auth}/>
              <Route path='/' component={BurgerBuilder}/>
            </Switch>
          </Layout>
          
        </div>
    );
  }
}

export default App;
