import { commonService } from '../_services/';
import { history } from '../_helpers';
import { toast } from 'react-toastify';

export const userActions = {
    login,
    logout,
    register
};
function login(username, password) {

    return dispatch => {
        let apiEndpoint = 'api/Users/Token';
        let payload = {
            username: username,
            password: password
        }
        commonService.addData(apiEndpoint, payload)
            .then((response) => {
                if (response && response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('auth', true);
                    localStorage.setItem('userName', response.data.firstName + " " + response.data.lastName);
                    localStorage.setItem('isAdmin', response.data.isAdmin);
                    localStorage.setItem('cartCount', response.data.userCartValue);
                    dispatch(setUserDetails(response.data));
                    history.push('/dashboard');
                }
                else {
                    toast.error(response.response.data.message);
                }
            })
    };
}
function register(payload) {
    debugger;
    return dispatch => {
        let apiEndpoint = 'api/Users/Register';
        commonService.addData(apiEndpoint, payload)
            .then((response) => {
                if (response && response.data) {
                    toast.success("User successfully registered.");
                    dispatch(login(payload.email, payload.password));
                }
                else {
                    toast.error(response.response.data.message);
                }
            })
    };
}
function logout() {
    return dispatch => {
        localStorage.clear();
        history.push('/login');
    }
}
export function setUserDetails(user) {
    return {
        type: "LOGIN_SUCCESS",
        auth: user.auth,
        token: user.token
    }
}
export function logoutUser() {
    return {
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ''
    }
}