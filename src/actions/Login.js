import { LOGIN, ITEM_HAS_ERROR, LOGIN_EXPIRE, LOGOUT } from '../ultils/constants/actionType';
import url from '../ultils/constants/api';

export const loginSuccess = (item) => {
    console.log(item);
    return { type: LOGIN, payload: item };
};

const loginError = err => {
    console.log('Login Error', err);
    return { type: ITEM_HAS_ERROR, payload: null };
};
const logout = () => {
    console.log('Login expire');
    return { type: LOGOUT, payload: null };
};
const login = (username, password) => dispatch => {
    const apiLogin = url.API_LOGIN;
    fetch(apiLogin, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then((res) => {
            dispatch(loginSuccess(res));
        })
        .catch((err) => dispatch(loginError(err)));
};
const checkAlive = (userId) => dispatch => {
    const apiCheckAlive = url.getUrlCheckToken(userId);
    fetch(apiCheckAlive, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then((res) => {
            if (res.ttl <= 0) {
                dispatch(logout());
            }
        });
};

export { login, checkAlive };
