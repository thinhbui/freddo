const host = 'https://freddocf-cyberjunky.c9users.io/api';
const url = {
    API_LOGIN: `${host}/accounts/login`,
    getUrlCheckToken: (userid) => `${host}/accounts/${userid}/accessTokens`,
    API_GET_TABLE: `${host}/tables`,
    updateTable: (id) => `${host}/tables/${id}`,
    getToken: (id) => `${host}/accounts/${id}/accessTokens`,
    GET_MENU: `${host}/menu_items`,
    getOrder: (id) => `${host}/orders/${id}`,
    postOrder: `${host}/orders`,
    updateOrder: (id) => `${host}/orders/${id}`,
    getHistory: (user, min, max) =>
        `${host}/orders?filter[where][status]=true&filter[limit]=${max}&filter[skip]=${min}`,
};
export default url;
