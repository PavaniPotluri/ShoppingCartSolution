import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FormGroup, Input, Label } from 'reactstrap';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                emailId: '',
                username: '',
                password: '',
                isActive: true,
                isAdmin: false
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
        debugger;
        e.preventDefault();
        this.setState({ submitted: true });
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.emailId,
            password: this.state.password,
            isActive: true,
            isAdmin: this.state.isAdmin ? this.state.isAdmin : false

        };
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }
    render() {
        const { submitted, firstName, lastName, emailId, password, isAdmin } = this.state;
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
                                                <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                                                    <label htmlFor="username">First Name</label>
                                                    <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange('firstName')} />
                                                    {submitted && !firstName &&
                                                        <div className="help-block">First Name is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                                                    <label htmlFor="username">Last Name</label>
                                                    <input type="text" className="form-control" name="username" value={this.state.lastName} onChange={this.handleChange('lastName')} />
                                                    {submitted && !lastName &&
                                                        <div className="help-block">Last Name is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !emailId ? ' has-error' : '')}>
                                                    <label htmlFor="username">Email</label>
                                                    <input type="text" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" className="form-control"
                                                        name="username" value={this.state.emailId} onChange={this.handleChange('emailId')} />
                                                    {submitted && !emailId &&
                                                        <div className="help-block">Email is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange('password')} />
                                                    {submitted && !password &&
                                                        <div className="help-block">Password is required</div>
                                                    }
                                                </div>
                                                <div className="form-group col-sm-6">
                                                    <FormGroup check className="checkbox">
                                                        <Input className="form-check-input" type="checkbox" id="isAdmin"
                                                            name="isAdmin" checked={isAdmin} value={isAdmin}
                                                            onChange={(e) => { this.setState({ isAdmin: !this.state.isAdmin }) }} />
                                                        <Label check className="form-check-label" htmlFor="isAdmin">Admin</Label>
                                                    </FormGroup>
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