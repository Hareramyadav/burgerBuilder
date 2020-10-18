import React, { Component } from "react";
import classes from './Auth.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';

import * as actions from '../../Store/actions/index';
import {connect} from 'react-redux';


class Auth extends  Component{

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                isEmail:true,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:8
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }

    checkValidity(value, rules){
        if(!rules){                     //if validation is not necessary in some tags like dropdown
            return true                 // we use this  in this we are usin both validation-empty and this 
        }

        let isValid=true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }
        return isValid;
    }

    formValueHandler=(event, controlName)=>{
        const updatedControlsForm={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControlsForm})
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp );
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp: !prevState.isSignUp
            };
        })
    }

    render(){
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} 
                        changed={(event)=>this.formValueHandler(event, formElement.id)}/>
                ))

                if(this.props.loading){
                    form = <Spinner/>
                }

                let errorMessage=null;
                if(this.props.error){
                    errorMessage=(
                        <p>{this.props.error.message}</p>
                    )
                }

        return(
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN':'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onAuth: ( email, password, isSignUp ) => dispatch( actions.auth( email, password, isSignUp ) )
    };
};
        


export default connect(mapStateToProps, mapDispatchToProps)(Auth);

/* above in mapStateToProps auth is used because reducer is set as auth in index.js  */