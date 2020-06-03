import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                emailId:'',
                username: '',
                password: ''
            },
            submitted: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if (localStorage.getItem('auth')) {
            history.push('/dashboard');
        }
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }
    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">                                 
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h2 text-gray-900 mb-4">Register</h1>
                                            </div>
                                            <form name="form" onSubmit={this.handleSubmit}>
                                                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                                    <label htmlFor="username">Username</label>
                                                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange('username')} />
                                                    {submitted && !username &&
                                                        <div className="help-block">Username is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange('password')} />
                                                    {submitted && !password &&
                                                        <div className="help-block">Password is required</div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-primary">Register</button>
                                                    <Link to="/" className="btn btn-link">Cancel</Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
const connectedRegisterPage = withRouter(connect(mapStateToProps)(Register));
export { connectedRegisterPage as Register };