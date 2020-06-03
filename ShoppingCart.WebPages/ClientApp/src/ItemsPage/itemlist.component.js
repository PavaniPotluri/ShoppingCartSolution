import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import {itemActions, cartActions} from '../_actions'
import ItemsCard from './items.card';
import { history } from '../_helpers';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class ItemsList extends Component {

    constructor(props) { 
        super(props);  
        this.state = {}; 
        
      this.isAdmin = localStorage.getItem('isAdmin').toLowerCase() =="true" ;
      }  

    componentDidMount()
    {
        const { dispatch } = this.props;
        dispatch(itemActions.getAll());
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props != nextProps)
        {
            
            if(nextProps.itemData && nextProps.itemData.items)
            {
                this.setState(nextProps.itemData.items);
            }
        }
    }

    addToCartHandler(item)
    {
        if (window.confirm("Do you wish to add this item?")) {
            let payload={
                itemId:item.itemId,
                quantity:1
            }
            const { dispatch } = this.props;
            dispatch(cartActions.addToCart(payload));
            history.push('/items');
        }
    }
    addeditItemHandler(id) {       
        this.props.history.push({ pathname: '/addeditItem/' + id }); 
    }


    render() {
        const { itemData } = this.props;
        
        return (
         
            <Fragment>
                {itemData && itemData.loading && <p>Loading items...</p>}
                {itemData && itemData.error && <span className="text-danger">ERROR: {itemData.error}</span>}
                {itemData &&
                <div>
                <table style={{width:"100%"}}>
                    <tbody>
                    <tr>
                        <td><h1 className="h3 mb-2 text-gray-800">Items</h1></td>
                        <td align="right">
                        {this.isAdmin && 
                            <button className="btn btn-success" onClick={()=>this.addeditItemHandler(0)}> Add Item</button>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Row>
                    {itemData && itemData.items && itemData.items.map((item)=>
                        <ItemsCard key={item.itemId} category={item.categoryName} addToCart={()=>this.addToCartHandler(item)}
                        itemName={item.description} price={item.price} rating={item.rating} 
                        isAdmin={this.isAdmin} editItem={()=>this.addeditItemHandler(item.itemId)}></ItemsCard>
                    )}
                </Row>
                </div>
    }
                
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
     const { itemData } = state;
    return {
        itemData
    };
}

const connectedItemsListPage = withRouter(connect(mapStateToProps)(ItemsList));
export { connectedItemsListPage as ItemsList };