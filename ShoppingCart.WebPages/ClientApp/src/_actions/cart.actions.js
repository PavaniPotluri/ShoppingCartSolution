import { commonService } from '../_services/';
import { history } from '../_helpers';
import { toast } from 'react-toastify';

export const cartActions = {
    getAll,
    addToCart,
    updateCart,
    deleteCart
};
function getAll() {
    
    return dispatch => {
        let apiEndpoint = 'api/UserCart/GetAll';
        
        dispatch(setCartRequest());
        commonService.getAll(apiEndpoint)
            .then((response) => {
                if (response && response.data ) {
                    localStorage.removeItem('cartCount');
                    
                    localStorage.setItem('cartCount', response.data.length);
                    dispatch(setCartDetails(response.data));
                }
                else {
                    dispatch(setCartError("Error: error loading cart items"));
                }
            })
    };
}
function addToCart(payload)
{
    return dispatch => {
        let apiEndpoint = 'api/UserCart/AddToCart';
        commonService.addData(apiEndpoint, payload)
            .then((response) => {
                if (response) {
                    toast.success("Item succesfully added to the cart.");
                    dispatch(getAll());
                    dispatch(setCartMessage("Item succesfully added to the cart."));
                }
                else {
                    toast.error(response.response.data.message);
                    dispatch(setCartError("Error: Falied to add cart items."));
                }
            })
    };
}

function updateCart(payload,id)
{
    
    return dispatch => {
        let apiEndpoint = 'api/UserCart/ModifyCartItem/'+id;
        commonService.updateData(apiEndpoint, payload,id)
            .then((response) => {
                if (response) {
                    dispatch(setCartMessage("Cart data updated successfully."));
                    dispatch(getAll());
                    toast.success("Cart data updated successfully.");
                }
                else {
                    //history.push('/login');
                    toast.error("Error: Update failed.");
                    dispatch(setCartError("Error: Update failed."));
                }
            })
    };
}
function deleteCart(id)
{
    return dispatch => {
        let apiEndpoint = 'api/UserCart/DeleteCartItem/'+id;
        commonService.deleteData(apiEndpoint, id)
            .then((response) => {
                if (response) {
                    toast.success("Cart item deleted successfully.");
                    dispatch(setCartMessage("Cart item deleted successfully."));
                    dispatch(getAll());
                }
                else {
                    toast.error(response.response.data.message);
                    dispatch(setCartError("Error: Delete failed."));
                }
            })
    };
}

export function setCartDetails(data) {
    return {
        type: "CART_SUCCESS",
        cartItems: data
    }
}
export function setCartError(error) {
    return {
        type: "CART_ERROR",
        error: error
    }
}
export function setCartRequest() {
    return {
        type: "CART_REQUEST",
        loading: true
    }
}
export function setCartMessage(message)
{
    return{
        type:"CART_MESSAGE",
        message:message
    }
}
