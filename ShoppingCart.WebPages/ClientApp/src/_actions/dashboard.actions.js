import { commonService } from '../_services/';

export const dashboardActions = {
    getDashboardItems
};
function getDashboardItems() {

    return dispatch => {
        let apiEndpoint = 'api/Dashboard/GetDashboardItems';
        dispatch(setDashboardRequest());
        commonService.getAll(apiEndpoint)
            .then((response) => {
                if (response && response.data ) {
                    localStorage.setItem('cartCount', response.data.cartCount);
                    dispatch(setDashboardDetails(response.data));
                }
                else {
                    dispatch(setDashboardError("Error: error loading data"));
                }
            })
    };
}

export function setDashboardDetails(dashboard) {
    return {
        type: "DASHBOARD_SUCCESS",
        dashboardItems: dashboard
    }
}
export function setDashboardError(error) {
    return {
        type: "DASHBOARD_ERROR",
        error: error
    }
}
export function setDashboardRequest() {
    return {
        type: "DASHBOARD_REQUEST",
        loading: true
    }
}
