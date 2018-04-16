const host = 'https://freddocf-cyberjunky.c9users.io/api';
const url = {
    API_LOGIN: `${host}/accounts/login`,
    getUrlCheckToken: (userid) => `${host}/${userid}/accessTokens`,
    API_GET_TABLE: `${host}/tables`,
    updateTable: (id) => `${host}/tables/${id}`,
    getToken: (id) => `${host}/accounts/${id}/accessTokens`,
    GET_MENU: `${host}/menu_items`
};
export default url;
