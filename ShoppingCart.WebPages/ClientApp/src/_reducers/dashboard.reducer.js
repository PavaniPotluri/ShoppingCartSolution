
export function dashboard(state = {}, action) {
    
    switch (action.type) {
        case 'DASHBOARD_REQUEST':
            return{
                loading:true
            }
        case 'DASHBOARD_SUCCESS':
            return {
                loading:false,
                dashboardItems:action.dashboardItems
            };
        case 'DASHBOARD_ERROR':
            return{
                error:action.error
            };

        default:
            return state
    }
}