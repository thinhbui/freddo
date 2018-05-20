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
  deleteItemOrder,
  deleteOrderSuccess
} from './actions';

class AppNavigatorState extends Component {
  componentDidMount() {
    const { orders, tables, dispatch } = this.props;

    this.configNotification();

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid
    );
    // listen invoice changes
    socket.on(SOCKET_EVENT.INVOICE_UPDATE_DESK, data => {
      const index = orders.findIndex(item => item._id === data._id);
      if (index === -1) dispatch(postOrderSuccess(data));
      else dispatch(updateSuccess(data));
    });
    // listen invoice request
    socket.on(SOCKET_EVENT.INVOICE_REQUEST_DESK, data => {
      const table = tables.findIndex(item => data.table === item._id);
      if (table !== undefined) dispatch(updateTableSuccess(data));
      else dispatch(getTable());
    });
    // listen invoice complele
    socket.on(SOCKET_EVENT.INVOICE_COMPLETE_DESK, data => {
      console.log(SOCKET_EVENT.INVOICE_COMPLETE_DESK, data);
      const table = tables.findIndex(item => data.table === item._id);
      if (table !== undefined) dispatch(updateTableSuccess(data));
      else dispatch(getTable());
      const index = orders.findIndex(
        item =>
          item.table ? item.table._id === data._id : item.table === data._id
      );
      dispatch(deleteOrderSuccess(orders[index]));
    });
    // listen tavle changes
    socket.on(SOCKET_EVENT.TABLE_UPDATE_DESK, data => {
      dispatch(updateTableSuccess(data));
    });
    socket.on(SOCKET_EVENT.INVOICE_LEAVE_QUEUE_DESK, data => {
      // const index = tables.findIndex(item => item._id === data._id);
      console.log('INVOICE_LEAVE_QUEUE_DESK', data.table);
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

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid
    );
  }
  configNotification = () => {
    PushNotification.configure({
      onRegister: token => {
        // console.log('TOKEN:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        // console.log('NOTIFICATION:', notification);
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
  onBackButtonPressAndroid = () => {
    const { dispatch, nav } = this.props;
    console.log(this.props);
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
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
// const mapDispatchToProps = dispatch => ({
//   updateOrder: order => dispatch(updateSuccess(order)),
//   addOrder: order => dispatch(postOrderSuccess(order)),
//   updateTable: table => dispatch(updateTableSuccess(table)),
//   getTables: () => dispatch(getTable())
// });
const mapStateToProps = state => ({
  nav: state.nav,
  orders: state.OrderReducer,
  tables: state.TableReducer
});
export default connect(mapStateToProps)(AppNavigatorState);
