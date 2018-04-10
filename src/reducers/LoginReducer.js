import { LOGIN, LOGIN_EXPIRE, LOGOUT } from '../ultils/constants/actionType';
// import { initialState } from '../store';

const initialState = {
    isLogin: false,
    userId: '',
    isAlive: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                isLogin: true,
                userId: action.payload.userId,
                isAlive: true
            };
        }
        case LOGIN_EXPIRE: {
            return {
                ...state,
                isLogin: false,
                isAlive: false
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
