import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary =(props)=>{
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey=>{
    return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>
    });
    return(
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <p style={{textAlign:'center'}}><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' clicked={props.purchseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;