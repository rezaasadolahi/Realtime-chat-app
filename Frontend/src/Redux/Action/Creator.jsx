import { ActionTypes } from './Type'






export const Login = (value) => {
    return {
        type: ActionTypes.LOGIN,
        payload: value
    }
}








export const User_Clicked = (value) => {
    return {
        type: ActionTypes.USER_CLICLED,
        payload: value
    }
}
