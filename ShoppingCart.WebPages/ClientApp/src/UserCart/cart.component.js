import React, { Component, Fragment } from 'react';
import { Switch, Route } from "react-router";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade, Input } from 'reactstrap';
import AppBar from '../_components/appbar';
import Nav from '../_components/nav';
import {cartActions} from '../_actions'


const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class UserCart extends Component {

    constructor(props) { 
        super(props);  
        let options=[
            {"value":1,"label":1},
            {"value":2,"label":2},
            {"value":3,"label":3},
            {"value":4,"label":4},
            {"value":5,"label":5}];
        this.state = {
            submitted:false,
            loading:false,
            cartItems:[],
            options:options,
            cartValue:0
        }; 
      
      }  

    componentDidMount()
    {
        
        const { dispatch } = this.props;
        dispatch(cartActions.getAll());
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props !== nextProps)
        {
            if(nextProps.userCart && nextProps.userCart.cartItems)
            {
                let cartItems = nextProps.userCart.cartItems;
                let cartValue=0.00;
                
                for(var i=0;i<cartItems.length;i++)
                {
                    cartValue = cartValue + (cartItems[i].quantity * cartItems[i].item.price )
                }
                this.setState({
                    submitted:false,
                    loading:false,
                    cartItems:cartItems,
                    cartValue:cartValue
                  });

                  let data=this.state;
            }
        }
    }
    handleChange = (cartId, cart, event) => {
        const { target: { name, value } } = event;       
        cart.quantity = value;
        var index = this.state.cartItems.findIndex(x=> x.userCartId === cartId);
        if (index !== -1){     
            this.setState({
                cartItems: [
                   ...this.state.cartItems.slice(0,index),
                   Object.assign({}, this.state.cartItems[index], cart),
                   ...this.state.cartItems.slice(index+1)
                ]
              });
            let cartValue=0;
              for(var i=0;i<this.state.cartItems.length;i++)
              {
                  cartValue = cartValue + (this.state.cartItems[i].quantity * this.state.cartItems[i].item.price )
              }
              this.setState({cartValue:cartValue});
        }
      }
   

    updateHandler(cart){
        
        if (window.confirm("Do you wish to modify the cart?")) {
            let payload={
                userCartId:parseInt(cart.userCartId),
                itemId:parseInt(cart.item.itemId),
                quantity:parseInt(cart.quantity),
                item:{}
            }
            const { dispatch } = this.props;
            dispatch(cartActions.updateCart(payload,payload.userCartId));
        }
    }

    deleteHandler(id)
    {

        if (window.confirm("Do you wish to delete item from the cart?")) {
            const { dispatch } = this.props;
            
            dispatch(cartActions.deleteCart(id));
        }
    }
    render() {
        const { userCart } = this.props;
        
        const{submitted,loading,cartItems,options,cartValue}=this.state;


        return (

            
            <Fragment>
                <h1 className="h3 mb-2 text-gray-800"><i className="fa fa-shopping-cart text-primary"></i>Cart Items</h1>
                {userCart && userCart.loading && <p>Loading cart items...</p>}
                {userCart && userCart.message && <span className="text-success">ERROR: {userCart.message}</span>}
                {userCart && userCart.error && <span className="text-danger">ERROR: {userCart.error}</span>}
                <div className="row">
        <div className="col-xl-12 col-lg-12">
                 
                 <div className="card-body">
                <div className="table-responsive portlet">
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems && cartItems.map((cart,index) => 
                        <tr key={cart.userCartId}>
                            <td>{cart.item.description}</td>
                            <td>
                            <Input type="select" name="quantity" value={cart.quantity} onChange={(e)=>this.handleChange(cart.userCartId, cart, e)}>
                                {options.map((item)=>
                                 <option key={item.value} value={item.value}>{item.label}</option>
                                )}
                               
                            </Input>
                            </td>
                            <td>{cart.item.price * cart.quantity}/-</td>
                            <td>
                            <a className="btn btn-info btn-addon font-bold text-white" onClick={()=>this.updateHandler(cart)}>
                                Update
                            </a>&nbsp;&nbsp;
                            <a className="btn btn-danger btn-addon font-bold text-white" onClick={()=>this.deleteHandler(cart.userCartId)}>
                                Delete
                            </a>
                            </td>
                        </tr>
                        )} 
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" align="right" style={{fontWeight:"bold"}}>
                                Cart Value : <label className="btn btn-primary font-bold" style={{borderWidth:"1px"}}>{cartValue}/-</label>
                                </td>
                                
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                  
                    </div>
                </div>
                </div>
                </div>
                
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
     const { userCart } = state;
    return {
        userCart
    };
}

const connectedUserCartPage = withRouter(connect(mapStateToProps)(UserCart));
export { connectedUserCartPage as UserCart };