/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { BackHandler, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import { addListener } from './ultils/redux';
import RootNavigator from './RootNavigator';
import socket from './services/socket';
import { SOCKET_EVENT, STORAGE, STATUS_TABLE } from './ultils/constants/String';
import {
  postOrderSuccess,
  updateSuccess,
  updateTableSuccess,
  getTable,
  getItemSuccess,
  deleteOrderSuccess,
  addHistory
} from './actions';

class AppNavigatorState extends Component {
  state = { orders: [], tables: [] };
  componentDidMount() {
    const { dispatch } = this.props;

    this.configNotification();

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid
    );
    // listen invoice changes
    socket.on(SOCKET_EVENT.INVOICE_UPDATE_DESK, data => {
      const { orders, tables } = this.props;
      console.log('tables', tables);
      const index = orders.findIndex(item => item._id === data._id);
      if (index === -1) dispatch(postOrderSuccess(data));
      else dispatch(updateSuccess(data));
    });
    // listen invoice request
    socket.on(SOCKET_EVENT.INVOICE_REQUEST_DESK, data => {
      const { tables } = this.props;
      console.log('tables', tables);
      const table = tables.findIndex(item => data.table === item._id);
      if (table !== undefined) dispatch(updateTableSuccess(data));
      else dispatch(getTable());
    });
    // listen invoice complele
    socket.on(SOCKET_EVENT.INVOICE_COMPLETE_DESK, data => {
      const { orders, tables } = this.props;
      const table = tables.findIndex(item => data._id === item._id);
      if (table !== undefined) dispatch(updateTableSuccess(data));
      else dispatch(getTable());
      const index = orders.findIndex(item => {
        console.log(item);
        if (item.table !== undefined) {
          console.log(item.table._id === data._id);
          return item.table._id === data._id;
        }
        return item.table === data._id;
      });
      console.log(index, orders[index]);

      if (index !== -1) {
        dispatch(deleteOrderSuccess(orders[index]));
        dispatch(addHistory({ ...orders[index], status: true }));
      }
      // dispatch(updateSuccess(data));
    });
    // listen tavle changes
    // socket.on(SOCKET_EVENT.TABLE_UPDATE_DESK, data => {
    //   dispatch(updateTableSuccess(data));
    // });
    socket.on(SOCKET_EVENT.INVOICE_LEAVE_QUEUE_DESK, data => {
      // const index = tables.findIndex(item => item._id === data._id);
      const { orders, tables } = this.props;
      console.log('INVOICE_LEAVE_QUEUE_DESK', data);
      console.log('orders', orders);
      console.log('tables', tables);

      data.table.status = STATUS_TABLE.SERVED;
      PushNotification.localNotification({
        message: `${data.table.name} đã hoàn thành`
      });
      dispatch(updateSuccess(data));
      dispatch(updateTableSuccess(data.table));
    });
    AsyncStorage.getItem(STORAGE.MENU, (err, res) => {
      if (err) console.log(err);
      else if (res !== null) {
        const menu = JSON.parse(res);
        dispatch(getItemSuccess(menu));
      }
    });
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      orders: newProps.orders,
      tables: newProps.tables
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid
    );
  }
  onBackButtonPressAndroid = () => {
    const { dispatch, nav } = this.props;
    console.log(this.props);
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  configNotification = () => {
    PushNotification.configure({
      onRegister: token => {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: '711529978568',
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  };
  render() {
    const { dispatch, nav } = this.props;
    return (
      <RootNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  orders: state.OrderReducer,
  tables: state.TableReducer
});
export default connect(mapStateToProps)(AppNavigatorState);
