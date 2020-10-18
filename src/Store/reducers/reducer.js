import * as actionTypes from '../actions/actionTypes';


// this reducer is not used in this app

const initialState={
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice:4
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName]+1
                }
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName]-1
                }
            }
        default:
            return state;
    }
}

export default reducer;