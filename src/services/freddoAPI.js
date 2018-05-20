import axios from 'axios';
import url from '../ultils/constants/api';

// const freddo = axios.create({
//   baseURL: HOST,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

const login = async (username, password) => {
  console.log('login', { username, password });
  try {
    const result = await axios.post(url.LOGIN, {
      email: username,
      password
    });
    if (result.status === 200) {
      axios.defaults.headers.common.Authorization = result.data.token;
    }
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTables = async () => {
  try {
    return await axios.get(url.GET_TABLE);
  } catch (error) {
    return error;
  }
};

const updateTables = async table => {
  try {
    return await axios.post(url.updateTable(), { ...table });
  } catch (error) {
    return error;
  }
};

const getMenus = async () => {
  try {
    return await axios.get(url.GET_MENU);
  } catch (error) {
    return error;
  }
};

const postOrder = async order => {
  try {
    return await axios.post(url.POST_ORDER, { ...order });
  } catch (error) {
    return error;
  }
};
const getOrders = async () => {
  try {
    return await axios.get(url.GET_ORDER);
  } catch (error) {
    return error;
  }
};
const getOrderById = async id => {
  try {
    return await axios.get(url.GET_ORDER_ID(id));
  } catch (error) {
    return error;
  }
};
const getOldOrders = async (page, perPage) => {
  try {
    return await axios.get(url.getHistory(page, perPage));
  } catch (error) {
    return error;
  }
};
const updateOrder = async order => {
  try {
    return await axios.post(url.POST_ORDER, {
      ...order
    });
  } catch (error) {
    return error;
  }
};
const deleteOrder = async id => {
  try {
    return await axios.delete(url.deleteOrder(id), { id });
  } catch (error) {
    return error;
  }
};
export {
  login,
  getTables,
  updateTables,
  getMenus,
  postOrder,
  getOrders,
  getOldOrders,
  updateOrder,
  getOrderById,
  deleteOrder
};
