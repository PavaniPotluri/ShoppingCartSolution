import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import { Login } from './LoginPage/';
import { Register } from './RegisterPage/';
import { Dashboard } from './Dashboard/';
import { history } from './_helpers';
import { PrivateRoute } from './_components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Layout } from './_components/layout';

class App extends Component {
    render() {
        return (
            <div className="App" id="wrapper">
                <Router history={history}>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/">
                            <Layout />
                        </PrivateRoute>                     
                    </Switch>
                </Router>
                <ToastContainer position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </div>
        );
    }
}
export default App;
