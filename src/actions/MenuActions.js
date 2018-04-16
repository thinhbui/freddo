import { GET_MENU, ITEM_HAS_ERROR } from '../ultils/constants/actionType';

import url from '../ultils/constants/api';

const getItemSuccess = (item) => {
    // console.log(item);
    return { type: GET_MENU, payload: item };
};

const error = err => {
    console.log('Login Error', err);
    return { type: ITEM_HAS_ERROR };
};

const getMenu = (id) => dispatch => {
    const api = url.GET_MENU;
    console.log(api);
    fetch(api, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: id,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then((res) => {
            // console.log('getMenu', res);
            dispatch(getItemSuccess(res));
        })
        .catch((err) => dispatch(error(err)));
};

export { getMenu };

