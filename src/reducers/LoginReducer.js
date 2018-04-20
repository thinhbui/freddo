import { LOGIN, LOGOUT, LOGIN_ERROR, TOKEN } from '../ultils/constants/actionType';
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
        case LOGIN: {
            return {
                id: action.payload.id,
                isLogin: true,
                userId: action.payload.userId,
                isAlive: true,
                // ...action.payload
            };
        }
        case LOGIN_ERROR: {
            return {
                token: action.payload,
                ...state
            };
        }
        case TOKEN: {
            console.log(action.payload);

            return {
                token: action.payload,
                ...state
            };
        }
        case LOGOUT: {
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
