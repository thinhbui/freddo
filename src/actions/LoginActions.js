import { LOGIN, LOGOUT, LOGIN_ERROR, TOKEN } from '../ultils/constants/actionType';
import url from '../ultils/constants/api';

const loginSuccess = (item) => {
    // console.log(item);
    return { type: LOGIN, payload: item };
};
const getTokenSuccess = (item) => {
    // console.log('getTokenSuccess', item);
    return { type: TOKEN, payload: item };
};

const loginError = err => {
    // console.log('Login Error', err);
    return { type: LOGIN_ERROR, payload: null };
};
const logout = () => {
    // console.log('Login out');
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
        .then(response => response.json())
        .then((res) => {
            if (res.error) {
                dispatch(loginError(res.error));
            } else {
                // res.username = username;
                dispatch(loginSuccess(res));
            }
        })
        .catch((err) => dispatch(loginError(err)));
};
const getToken = (id, userId) => dispatch => {
    const apiGetToken = url.getToken(id);
    console.log(apiGetToken);

    fetch(apiGetToken, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId })
    })
        .then(response => response.json())
        .then((res) => {
            if (res.error) {
                // dispatch(loginError(res.error));
                console.log('getToken error', res);
            }
            console.log('getToken', res);

            dispatch(getTokenSuccess(res));
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

export { login, checkAlive, getToken };