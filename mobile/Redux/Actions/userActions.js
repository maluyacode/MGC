import axios from "axios";
import * as userAction from '../Constants/userContstants'
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginAction = (values) => async (dispatch) => {
    try {

        dispatch({
            type: userAction.REQUEST_ACTION,
            payload: 'Logging in'
        })

        const { data } = await axios.post(`${baseURL}/users/login`, values);

        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user))

        dispatch({
            type: userAction.USER_LOGIN_SUCCESS,
            payload: data,
        })


    } catch (err) {

        dispatch({
            type: userAction.REQUEST_FAIL,
            payload: err?.response?.data?.message || 'Please try again later'
        })

        console.log(err)

    }
}

export const logoutAction = () => async (dispatch) => {

    try {

        dispatch({
            type: userAction.REQUEST_ACTION,
            payload: 'Logging out'
        })

        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('token');
        
        dispatch({
            type: userAction.USER_LOGOUT_SUCCESS,
            payload: 'Successfully logout'
        })

    } catch (err) {

        dispatch({
            type: userAction.REQUEST_FAIL,
            payload: err?.response?.data?.message || 'Please try again later'
        })

        console.log(err)

    }

}

export const clearErrors = () => async (dispatch) => {

    setTimeout(() => {
        dispatch({
            type: userAction.CLEAR_ERROR
        })
    }, 5000)

}