import React, { useState, Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { userActions } from '../_actions';
import { connect } from 'react-redux';
import CartCount from './cart.count';
const { isShow, setShow } = false;
const drawerWidth = 240;

class TopMenuBar extends React.Component {
    state = {
        anchor: 'left',
        email: '',
        isShow: false
    };
    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    logout = event => {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        this.setState({ isShow: false });
    }

    setShow = event => {
        this.setState({ isShow: !this.state.isShow });
    }

   

    render() {
        const cartCount = localStorage.getItem('cartCount') ? localStorage.getItem('cartCount'):0;
        const { classes } = this.props;
        const { anchor } = this.state;
        this.state.email = localStorage.getItem('auth') ? localStorage.getItem('userName') : "";
        return (
            <Fragment>
                <nav className="navbar navbar-expand navbar-light bg-custom-bar topbar mb-4 static-top shadow">
                    <ul className="navbar-nav ml-auto">  
                        <li>
                        <CartCount count={cartCount}></CartCount>
                            
                        </li>                   
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle"
                                onClick={(event) => { this.setShow() }}
                                href="# "
                                id="userDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline large text-white font-bold">{this.state.email}</span>
                                <img className="img-profile" alt="" />
                            </a>
                            <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(this.state.isShow) ? "show" : ""}`}
                                aria-labelledby="userDropdown">
                                <a className="dropdown-item"
                                    onClick={(event) => { this.logout() }}
                                    href="# "
                                    data-toggle="modal"
                                    data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                            </a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    const { loggingIn,dashboard,userCart,itemData } = state.authentication;
    return {
        loggingIn,
        dashboard,
        userCart,
        itemData
    };
}
export default connect(mapStateToProps)(TopMenuBar);