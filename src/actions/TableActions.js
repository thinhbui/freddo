import { ITEM_HAS_ERROR, GET_TABLE } from '../ultils/constants/actionType';
import url from '../ultils/constants/api';

const getItemSuccess = (item) => {
    // console.log(item);
    return { type: GET_TABLE, payload: item };
};

const error = err => {
    console.log('Login Error', err);
    return { type: ITEM_HAS_ERROR };
};

const getTable = () => dispatch => {
    const api = url.API_GET_TABLE;
    fetch(api, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
            // console.log('getTable', res);
            dispatch(getItemSuccess(res));
        })
        .catch((err) => dispatch(error(err)));
};
const updateTable = (table) => dispatch => {
    const apiUpdate = url.updateTable(table.id);
    fetch(apiUpdate, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(table)
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then((res) => {
            console.log('getTable', res);
            dispatch(getItemSuccess(res));
        })
        .catch((err) => dispatch(error(err)));
};
export { getTable };

