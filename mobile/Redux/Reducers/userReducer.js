import * as userAction from '../Constants/userContstants'

export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case userAction.REQUEST_ACTION:
            return {
                ...state,
                loading: true,
                loadingText: action.payload,
            }
        case userAction.REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                loadingText: null,
                errorText: action.payload,
                success: false,
            }
        case userAction.CLEAR_ERROR:
            return {
                ...state,
                errorText: null,
            }

        case userAction.USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userInfo: action.payload.user,
                loading: false,
                success: true,
                successMessage: action.payload.message,
            }
        case "UPDATE_ME":
            return {
                ...state,
                userInfo: action.payload.user,
            }
        case userAction.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                userInfo: null,
                loading: false,
                success: true,
                successMessage: action.payload,
            }
    }
    return state
}