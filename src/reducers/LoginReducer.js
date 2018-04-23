import types from '../ultils/constants/actionType';
// import { initialState } from '../store';

const initialState = {
    isLogin: false,
    userId: '',
    isAlive: false,
    token: '',
    id: ''
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN: {
            return {
                id: action.payload.id,
                isLogin: true,
                userId: action.payload.userId,
                isAlive: true,
                // ...action.payload
            };
        }
        case types.LOGIN_ERROR: {
            return {
                token: action.payload,
                ...state
            };
        }
        case types.TOKEN: {
            console.log(action.payload);

            return {
                token: action.payload,
                ...state
            };
        }
        case types.LOGOUT: {
            return {
                isLogin: false,
                isAlive: false,
                userId: ''
            };
        }
        default:
            return state;
    }
};
