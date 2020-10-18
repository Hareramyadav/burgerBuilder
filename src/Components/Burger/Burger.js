import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';



const burger =(props)=>{
    console.log(props);
    //this is the way of converting js object to array
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
        return[...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredients key={igKey+i} type={igKey}/>;
        });
    })
    .reduce((arr, el)=>{
        return arr.concat(el);
    }, []);
    //console.log(transformedIngredients);
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please Start Adding Ingredients</p>
    }
    //Here burger is props but state is object so to use object in props 
    //we need to change props to object by using object keyword.
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredients type='bread-bottom'/>

        </div>
    );
};

export default burger;