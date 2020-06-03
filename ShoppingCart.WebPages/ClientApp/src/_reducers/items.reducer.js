
export function itemData(state = {}, action) {
    
    switch (action.type) {
        case 'ITEM_REQUEST':
            return{
                loading:true
            }
        case 'ITEM_SUCCESS':
            return {
                loading:false,
                items:action.items
            };
            case 'ITEM_GET_SUCCESS':
                return {
                    loading:false,
                    itemDetails:action.itemDetails
                };
        case 'ITEM_ERROR':
            return{
                error:action.error
            };

        default:
            return state
    }
}