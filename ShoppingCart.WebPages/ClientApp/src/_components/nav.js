import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { userActions } from '../_actions';
import { connect } from 'react-redux';
const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: 'left',
        }
        this.state = {
            leftMenuVisibility: false,
            setLeftMenuVisibility: false
        }
    }

    logout = event => {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    changeLeftMenuVisibility() {
        this.state.setLeftMenuVisibility(!this.state.leftMenuVisibility);
    }

    getCollapseClass() {
        return (this.state.leftMenuVisibility) ? "" : "collapsed";
    }

    render() {
        const { classes } = this.props;
        const { anchor } = this.state;
        return (
            <Fragment>
                <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion`}
                    id="collapseMenu">

                    <a className="sidebar-brand d-flex align-items-center justify-content-center text-white fa fa-shopping-cart xxl" href="index.html">
                    &nbsp;&nbsp;SHOPPING CART
                    </a>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="Dashboard">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />     
                    <li className="nav-item">
                        <Link className="nav-link" to={`/items`}>
                            <i className="fa fa-list"></i>
                            <span>Items</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
export default connect(mapStateToProps)(Navigation);