
export function itemCategoryData(state = {}, action) {
    
    switch (action.type) {
        case 'ITEM_CAT_REQUEST':
            return {
                loading:true,
            };
        case 'ITEM_CAT_SUCCESS':
            return {
                loading:false,
                categoryData:action.categoryData
            };
           
        case 'ITEM_CAT_ERROR':
            return{
                error:action.error
            };

        default:
            return state
    }
}