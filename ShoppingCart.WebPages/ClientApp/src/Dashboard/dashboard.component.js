import React, { Component, Fragment } from 'react';
import { Switch, Route } from "react-router";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '../_components/appbar';
import Nav from '../_components/nav';
import { dashboardActions, cartActions } from '../_actions';
import  TopCard  from './dashboard.card';
import { history } from '../_helpers';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class Dashboard extends Component {

    constructor(props) { 
        super(props);  
        this.state = {}; 
      
      }  

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(dashboardActions.getDashboardItems());
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props != nextProps)
        {
            
            if(nextProps.dashboard && nextProps.dashboard.dashboardItems)
            {
                this.setState(nextProps.dashboard.dashboardItems);
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
            
        }
    }

    gotoCartHandler()
    {
        history.push('/userCart');
    }

    render() {
        const { dashboard } = this.props;
        return (
            <Fragment>
                <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
                {dashboard && dashboard.loading && <p>Loading dashboard...</p>}
                {dashboard && dashboard.error && <span className="text-danger">ERROR: {dashboard.error}</span>}
                {dashboard && dashboard.dashboardItems &&
                <div>
                <div className="row">
                    <TopCard title="PENDING ORDERS" text={`${dashboard.dashboardItems.pendingCount}`} icon="box" class="primary" />
                    <TopCard title="PROCESSED ORDERS" text={`${dashboard.dashboardItems.completedCount}`} icon="warehouse" class="danger" />
                    <TopCard title="CART COUNT" text={`${dashboard.dashboardItems.cartCount}`} icon="shopping-cart" class="success" clicked={this.gotoCartHandler}/>    
                 </div>

                  <div className="row">
        <div className="col-xl-12 col-lg-12">
                 <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Deals</h6>
            </div>
                 <div className="card-body">
                <div className="table-responsive portlet">
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Offer Price</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {dashboard.dashboardItems && dashboard.dashboardItems.offerItems.map((item) => 
                        <tr key={item.itemId}>
                            <td>{item.description}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.price}/-</td>
                            <td>{item.offerPrice}/-</td>
                            <td>
                            <a className="btn btn-info btn-addon font-bold text-white" onClick={()=>this.addToCartHandler(item)}>
                                <i className="fa fa-cart-plus" ></i>&nbsp;&nbsp;Add to cart
                            </a>
                            </td>
                        </tr>
                        )} 
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                </div>
                </div>
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    
    const { dashboard } = state;
    return {
        dashboard
    };
}

const connectedDashboardPage = withRouter(connect(mapStateToProps)(Dashboard));
export { connectedDashboardPage as Dashboard };