import { ActionTypes } from '../Action/Type'


const initialState = {
    Login: [],
    User_Clicked: +'',
}





export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                Login: action.payload
            }

        case ActionTypes.USER_CLICLED:
            return {
                ...state,
                User_Clicked: action.payload
            }


        default:
            return state
    }
}