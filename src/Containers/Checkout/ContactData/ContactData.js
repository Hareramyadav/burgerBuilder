import React, { Component } from "react";
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';


class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zip_code:{
                    elementType:'input',
                    elementConfig:{
                        type:'number',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest', displayValue:'fastest'},
                            {value:'cheapest', displayValue:'cheapest'}
                        ]
                    },
                    value:'',
                    validation:{},//if validation is not required leave validation empty
                    valid:true
                }
            },
            formIsValid:false,
            loading:false
        }

    orderHandler=(event)=>{
        event.preventDefault();
        //  alert('Continue to Checkout');
        this.setState({loading:true});
        const formData={};
        for (let orderFormInputidentifier in this.state.orderForm){
            formData[orderFormInputidentifier]=this.state.orderForm[orderFormInputidentifier].value;
        }
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
            
        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({loading:false});
            });
    }

    checkValidity(value, rules){
        if(!rules){                     //if validation is not necessary in some tags like dropdown
            return true                 // we use this  in this we are usin both validation-empty and this 
        }

        let isValid=true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }


    formValueHandler=(event, inputIdentifier)=>{
        //console.log(event.target.value);
        const updatedorderForm = {
            ...this.state.orderForm
        };
        const updatedformElement = {
            ...updatedorderForm[inputIdentifier]
        };
        updatedformElement.value=event.target.value;
        updatedformElement.valid=this.checkValidity(updatedformElement.value, updatedformElement.validation);
        updatedorderForm[inputIdentifier]=updatedformElement;
        updatedformElement.touched=true;
        
        let formIsValid=true;
        for(let inputIdentifier in updatedorderForm){
            formIsValid=updatedorderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedorderForm, formIsValid: formIsValid});

    }

    render(){
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} 
                        changed={(event)=>this.formValueHandler(event, formElement.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
                {/* clicked={this.orderHandler} this is property of Button */}
            </form>
        );
        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h1>Enter Your Data</h1>
                {form}
            </div>
        );
    }
}

export default ContactData;

