import { commonService } from '../_services/';
import { history } from '../_helpers';
import { toast } from 'react-toastify';

export const itemActions = {
    getAll,
    getSingle,
    addItem,
    updateItem,
    deleteItem,
    getCategories
};
function getAll() {
    return dispatch => {
        let apiEndpoint = 'api/Items/GetItems';
        dispatch(setItemRequest());
        commonService.getAll(apiEndpoint)
            .then((response) => {
                if (response && response.data) {
                    dispatch(setItemSuccess(response.data));
                }
                else {
                    dispatch(setItemError("Error: error loading data"));
                }
            })
    };
}
function getSingle(id) {
    return dispatch => {
        let apiEndpoint = 'api/Items/GetSingle/' + id;
        dispatch(setItemRequest());
        commonService.getSingle(apiEndpoint)
            .then((response) => {
                if (response && response.data) {
                    dispatch(setItemDetails(response.data));
                }
                else {
                    dispatch(setItemError("Error: error loading items"));
                }
            })
    };
}

function addItem(payload) {
    return dispatch => {
        let apiEndpoint = 'api/Items/AddItem';
        commonService.addData(apiEndpoint, payload)
            .then((response) => {
                if (response && response.data) {
                    debugger;
                    toast.success("Item saved succesfully.");
                    dispatch(getAll());
                    dispatch(setItemMessage("Item saved succesfully"));
                    history.push('/items');
                }
                else {
                    if (response.response.status == "409")
                        toast.warning(response.response.data.message);
                    else
                        toast.error(response.response.data.message);

                }
            })
    };

}

function updateItem(payload, id) {

    return dispatch => {
        let apiEndpoint = 'api/Items/UpdateItem/' + id;
        commonService.updateData(apiEndpoint, payload, id)
            .then((response) => {
                if (response) {
                    dispatch(setItemMessage("Item data updated successfully."));
                    dispatch(getAll());
                    toast.success("Item data updated successfully.");
                    history.push('/items');
                }
                else {
                    //history.push('/login');
                    toast.error("Error: Update failed.");
                    dispatch(setItemError("Error: Update failed."));
                }
            })
    };
}

function deleteItem(id) {
    return dispatch => {
        let apiEndpoint = 'api/Items/DeleteItem/' + id;
        commonService.deleteData(apiEndpoint, id)
            .then((response) => {
                if (response) {
                    toast.success("Item deleted successfully.");
                    dispatch(setItemMessage("Item deleted successfully."));
                    dispatch(getAll());
                }
                else {
                    toast.error(response.response.data.message);
                    dispatch(setItemError("Error: Delete failed."));
                }
            })
    };
}

function getCategories() {
    return dispatch => {
        let apiEndpoint = 'api/Items/GetCategories';
        dispatch(setItemCategoryRequest());
        commonService.getAll(apiEndpoint)
            .then((response) => {
                if (response && response.data) {
                    dispatch(setItemCategorySuccess(response.data));
                }
                else {
                    dispatch(setItemCategoryError("Error: error loading categories"));
                }
            })
    };
}
export function setItemSuccess(items) {
    return {
        type: "ITEM_SUCCESS",
        items: items
    }
}
export function setItemError(error) {
    return {
        type: "ITEM_ERROR",
        error: error
    }
}
export function setItemDetails(itemDetails) {
    return {
        type: "ITEM_GET_SUCCESS",
        itemDetails: itemDetails
    }
}
export function setItemRequest() {
    return {
        type: "ITEM_REQUEST",
        loading: true
    }
}
export function setItemMessage(message) {
    return {
        type: "ITEM_MESSAGE",
        message: message
    }
}
export function setItemCategorySuccess(data) {
    return {
        type: "ITEM_CAT_SUCCESS",
        categoryData: data
    }
}
export function setItemCategoryRequest() {
    return {
        type: "ITEM_CAT_REQUEST",
        loading: true
    }
}
export function setItemCategoryError(error) {
    return {
        type: "ITEM_CAT_ERROR",
        error: error
    }
}