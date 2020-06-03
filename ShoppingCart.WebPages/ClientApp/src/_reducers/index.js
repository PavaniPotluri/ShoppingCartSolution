import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { dashboard } from './dashboard.reducer';
import { userCart } from './cart.reducer';
import { itemData } from './items.reducer';
import { itemCategoryData } from './itemCategories.reducer';

const rootReducer = combineReducers({
    authentication,
    dashboard,
    userCart,
    itemData,
    itemCategoryData
});
export default rootReducer;