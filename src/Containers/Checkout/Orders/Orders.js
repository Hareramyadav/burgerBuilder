import React, { Component } from "react";
import {connect} from 'react-redux';

import Order from '../../../Components/Order/Order';
import axios from '../../../axios-orders';
import errorHandler from '../../../hoc/errorHandler/errorHandler';
import * as actions from '../../../Store/actions/index';
import Spinner from '../../../Components/UI/Spinner/Spinner';


// import {connect} from 'react-redux';

// class Orders extends Component{

//     state={
//         orders:[],
//         loading:true
//     }
    
//     componentDidMount(){
//         axios.get('/orders.json')
//             .then(res=>{
//                 const fetchedOrders=[];
//                 for (let key in res.data){
//                     fetchedOrders.push({
//                         ...res.data[key],
//                         id:[key]
//                     });
//                 }
//                 this.setState({loading:false, orders: fetchedOrders});
//             })
//             .catch(err=>{
//                 this.setState({loading:false});
//             })
//     }
    

//     render(){
//         return(
//             <div>
//                 {this.state.orders.map(order=>
//                     <Order key={order.id}
//                     ingredients={order.ingredients}
//                     price={order.price}/>
//                 )}
//             </div>
//         );
//     }
// }

// const mapStateToProps= state =>{
//     return{
//         token:state.auth.token
//     }
// }

// export default connect(mapStateToProps, null) (errorHandler (Orders, axios));

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch( actions.fetchOrders(token) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( errorHandler( Orders, axios ) );

/* the above commented code is used for managing state in same file.
but below code is used to manage state by redux */