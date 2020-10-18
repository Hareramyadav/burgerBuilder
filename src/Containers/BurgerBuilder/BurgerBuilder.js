import React,{ Component }  from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import axios from '../../axios-orders';
// import * as actionTypes from '../../Store/actions/actionTypes';
// import {connect} from 'react-redux';


const INGREDIENT_PRICES={
    salad: 0.5,
    meat: 1.5,
    cheese: 0.75,
    bacon: 0.5
};

class BurgerBuilder extends Component{
    state ={
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice:4,
        purchasable: false,
        purchasing:false ,  // condition for checking either order button is clicked or not
        loading:false,
        error:false
    }

    componentDidMount(){
        console.log(this.props);
        // axios.get('https://my-react-burger-b3504.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     this.setState({ingredients:response.data});
        // })
        // .catch(error=>{
        //     this.setState({error : true })
        // });
    }

    updatePurchaseState(ingredients){
        console.log(this.props);
        const sum = Object.keys(ingredients).map(igkey =>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum + el;
        }, 0);
        this.setState({purchasable:sum> 0})
    }

    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount= oldCount + 1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        // if(oldCount<=0){
        //     return;
        // }
        const updatedCount= oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceRemove=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice - priceRemove;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }
    
// it handles order now button
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    removePurchaseHandler=()=>{
        this.setState({purchasing:false});
    }

    continuePurchaseHandler=()=>{
        /*this is the way to send query to the server so that we can 
        extract from server where we need.*/
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        });      
    }


    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        let orderSummary=(
            <OrderSummary 
                ingredients={this.state.ingredients}
                purchseCancelled={this.removePurchaseHandler}
                purchaseContinued={this.continuePurchaseHandler}
                price={this.state.totalPrice}/>
        )
        if(this.state.loading){
            orderSummary=<Spinner/>
        }
        return(
            <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.removePurchaseHandler}>
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

// const mapStateToProps = state =>{
//     return{
//         ings: state.ingredients
//     }
// }

// const mapDispatchToProps= dispatch =>{
//     return{
//         onIngredientsAdded: (igName)=> dispatch({type:actionTypes.ADD_INGREDIENTS, ingredients:igName}),
//         onIngredientsAdded: (igName)=> dispatch({type:actionTypes.REMOVE_INGREDIENTS, ingredients:igName})
//     }
// }

export default errorHandler(BurgerBuilder, axios);
