const initialState = {
    sidebarClassName: 'sidebar-wrapper bg-skin-fill drop-shadow-md'
}
const setSidebarClassName = (isActive) => {
        return isActive ? `${initialState.sidebarClassName} layout-sidebar-active` : initialState.sidebarClassName;
    }
    // const updateLocalStorage = () =>{

// }
const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HANDLE_TOGGLE':
            return {
                ...state,
                sidebarClassName: setSidebarClassName(action.sidebarStatus),
                sidebarStatus: action.sidebarStatus
            }
        case 'HANDLE_MOUSE_EVENT':
            {
                const sidebarClassName = action.event === 'mouseenter' ? setSidebarClassName(true) : setSidebarClassName(false);
                return {
                    ...state,
                    sidebarClassName
                }
            }
        default:
            return state;
    }

}
export default sidebarReducer;