
export function userCart(state = {}, action) {
    
    switch (action.type) {
        case 'CART_REQUEST':
            return{
                loading:true
            }
        case 'CART_SUCCESS':
            return {
                loading:false,
                cartItems:action.cartItems
            };
            case 'CART_MESSAGE':
            return {
                loading:false,
                message:action.message
            };
        case 'CART_ERROR':
            return{
                error:action.error
            };

        default:
            return state
    }
}