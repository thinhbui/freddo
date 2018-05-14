import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import url, { HOST } from '../ultils/constants/api';

const freddo = axios.create({
  baseURL: HOST,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const login = async (username, password) => {
  try {
    const result = await freddo.post(url.LOGIN, {
      username,
      password
    });
    if (result.status === 200) {
      freddo.defaults.headers.Authorization = result.data.id;
      console.log(freddo);
    }
    return result;
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};

const getTables = async () => {
  try {
    return await freddo.get(url.GET_TABLE);
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};

const updateTables = async table => {
  try {
    return await freddo.put(url.updateTable(table.id), {
      orderid: table.orderid,
      status: table.status,
      name: table.name
    });
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};

const getMenus = async token => {
  try {
    if (token) freddo.defaults.headers.Authorization = token;
    return await freddo.get(url.GET_MENU);
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};

const postOrder = async order => {
  try {
    return await freddo.post(url.POST_ORDER, order);
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};
const getOrders = async () => {
  try {
    return await freddo.get(url.GET_ORDER);
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};
const getOrderById = async id => {
  try {
    return await freddo.get(url.GET_ORDER_ID(id));
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};
const getOldOrders = async (min, max) => {
  try {
    return await freddo.get(url.getHistory(min, max));
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};
const updateOrder = async order => {
  const id = order.id;
  const orderUpdate = order;
  delete orderUpdate.id;
  console.log(url.updateOrder(id));
  try {
    return await freddo.put(url.updateOrder(id), {
      ...orderUpdate
    });
  } catch (error) {
    Alert.alert('Lỗi', error);
    return error;
  }
};
const deleteOrder = async id => {
  try {
    return await freddo.delete(url.deleteOrder(id), { id });
  } catch (error) {
    Alert.alert('Lỗi', error);
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
  freddo,
  getOldOrders,
  updateOrder,
  getOrderById,
  deleteOrder
};
