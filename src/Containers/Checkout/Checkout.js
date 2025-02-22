import React, { Component } from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={
        ingredients:null,
        price:0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query.entries()) {
            //['salad','1']
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1]; //+param[1] is showing invalid array length so using param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/order-data');
    }

    render(){
            return(
                <div>
                    <CheckoutSummary 
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/order-data'} 
                        render={(props)=>(<ContactData 
                            ingredients={this.state.ingredients} 
                            price={this.state.totalPrice} {...props}/>)}/>
                </div>
            )
        
    }
}

export default Checkout;