import { HANDLE_TOGGLE, HANDLE_MOUSE_EVENT } from "./actionConstant";


const handleSidebarToggle = (status) => {
    return {
        type: HANDLE_TOGGLE,
        sidebarStatus: status
    }
}
const handleSidebarMouseEvent = (status) => {
    return {
        type: HANDLE_MOUSE_EVENT,
        event: status
    }
}
export {
    handleSidebarToggle,
    handleSidebarMouseEvent
}