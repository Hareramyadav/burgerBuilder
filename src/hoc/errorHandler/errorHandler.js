import React, {Component} from 'react';
import Aux from '../Aux';
import Modal from '../../Components/UI/Modal/Modal';

const errorHandler =(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentDidMount(){
            axios.interceptors.request.use=()=>{
                this.setState({error:null});
            }
            axios.interceptors.response.use(null,error=>{
                this.setState({error: error});
            });
        }

        errorConfirmedhandler=()=>{
            this.setState({error:null});
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedhandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default errorHandler;