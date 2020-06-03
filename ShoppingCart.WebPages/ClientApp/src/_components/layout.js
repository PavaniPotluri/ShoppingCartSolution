import React, { Component, Fragment } from 'react';
import { Switch, Route } from "react-router";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '../_components/appbar';
import Nav from '../_components/nav';
import { Dashboard } from '../Dashboard';
import { ItemsList } from '../ItemsPage';
import { AddEditItemPage }from '../ItemsPage/addedit.item';
import { UserCart } from '../UserCart';

class Layout extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Nav />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AppBar />
                        <div className="container-fluid">
                            <Switch>
                                <Route exact path="/addeditItem/:id" render={(props) => <AddEditItemPage {...props} />} ></Route>          
                                <Route path="/items"><ItemsList /></Route>
                                <Route path="/userCart"><UserCart /></Route>
                                <Route path="/"><Dashboard /></Route>      
                                              
                            </Switch>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const connectedLayoutPage = withRouter(connect(mapStateToProps)(Layout));
export { connectedLayoutPage as Layout };