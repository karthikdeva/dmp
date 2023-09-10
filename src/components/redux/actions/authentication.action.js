import { userConstants } from '../../../lib/constants/user.constants'
import { setAuthTokenInLocalStorage, clearSessionAndSignout } from "../../../lib/utilities";

export const loginAction = (userInfo, navigate) => {
    setAuthTokenInLocalStorage(userInfo);
    return (dispatch) => {
        dispatch(loginSuccess(userInfo));
        setTimeout(() => {
            navigate('/');
        }, 10);
    };
}

export const loginSuccess = (userInfo) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        data: userInfo
    };
}

export const logoutAction = () => {
    clearSessionAndSignout();
    return (dispatch) => {
        setTimeout(() => {
            dispatch(handleLogout());
        }, 5);
    }
}

export const handleLogout = () => {
    return {
        type: userConstants.LOGOUT
    };
}