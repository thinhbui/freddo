export const HOST = 'https://freddocf-cyberjunky.c9users.io/api';
const API = {
  LOGIN: '/accounts/login',
  getUrlCheckToken: userid => `/accounts/${userid}/accessTokens`,
  GET_TABLE: '/tables',
  updateTable: id => `/tables/${id}`,
  getToken: id => `/accounts/${id}/accessTokens`,
  deleteOrder: id => `/orders/${id}`,
  GET_MENU: '/menu_items',
  GET_ORDER: '/orders?filter[where][status]=false',
  GET_ORDER_ID: id => `/orders/${id}`,
  POST_ORDER: '/orders',
  updateOrder: id => `/orders/${id}`,
  getHistory: (min, max) =>
    `/orders?filter[where][status]=true&filter[limit]=${max}&filter[skip]=${min}`
};
export default API;
