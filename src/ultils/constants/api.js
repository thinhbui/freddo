export const HOST = 'https://freddo-cyberjunky.c9users.io:8080';
const API = {
  LOGIN: `${HOST}/api/users/login`,
  GET_TABLE: `${HOST}/api/table`,
  updateTable: () => `${HOST}/api/table`,
  deleteOrder: id => `${HOST}/api/order/${id}`,
  GET_MENU: `${HOST}/api/menuitem`,
  GET_ORDER: `${HOST}/api/order?status=false`,
  GET_ORDER_ID: id => `${HOST}/api/order/${id}`,
  POST_ORDER: `${HOST}/api/order`,
  // updateOrder: id => `/api/order/${id}`,
  getHistory: page => `${HOST}/orders?status=true&=page${page}`
};
export default API;
