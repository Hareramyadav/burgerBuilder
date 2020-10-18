import React from 'react';
import classes from './Order.module.css';

const order =(props)=>{
    //this is also a way to convert object to array  from const ingredients to return <span>
    const ingredients=[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput=ingredients.map(ig=>{
        return <span key={ig.name}
            style={{
                display:'inline-block',
                border:'1px solid #ccc',
                boxSizing:'border-box',
                boxShadow:'0 4px 3px #eee',
                margin:'0 10px',
                padding:'5px'

            }}>{ig.name} ({ig.amount})</span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price:<strong>Rs {props.price}</strong></p>
        </div>
    )
};

export default order;

