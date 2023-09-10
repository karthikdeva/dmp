import { userConstants } from '../../../lib/constants/user.constants'
import { getAuthInfo } from '../../../lib/utilities'

const user = getAuthInfo();
const initialState = user ? { loggingIn: false, loggedIn: true, user: user } : {};

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loggingIn: false,
                user: action.data
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false
            };
        case userConstants.LOGOUT:
            return { loggedIn: false, loggingIn: false };
        default:
            return state
    }
}