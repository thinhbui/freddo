import React, { Component } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  PushNotificationIOS
  // Dimensions
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Table, Header } from '../../components';
import styles from './styles';
import {
  getTable,
  updateTable,
  resetOrder,
  getOrders,
  deleteOrder,
  updateOrder
} from '../../actions';
import Images from '../../ultils/constants/Images';
import { STATUS_TABLE } from '../../ultils/constants/String';
/* eslint no-underscore-dangle: 0 */
// const senderID = '711529978568';

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={25}
        color="#fff"
      />
    ),
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      sortById: true,
      tables: [],
      refresh: false,
      changeTable: false,
      rootTable: {}
    };
    this.props.navigation.state.params.socket.on('require_pay', message => {
      PushNotification.localNotification({
        message, // (required)
        title: 'OK la'
      });
    });
  }
  // require_pay
  componentDidMount() {
    const { tables } = this.props;
    console.log('componentDidMount Home', this.props);
    this.setState({ tables });
    PushNotification.configure({
      onRegister: token => {
        console.log('TOKEN:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
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
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tables.length > 0) this.setState({ tables: newProps.tables });
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { tables } = this.state;
    if (this.state.sortById !== nextState.sortById) {
      if (nextState.sortById) {
        this.setState({
          tables: tables.sort((a, b) => (a._id > b._id ? 1 : -1))
        });
      } else if (tables.findIndex(item => item.status === true) !== -1) {
        this.setState({
          tables: tables.sort(a => (a.state ? 1 : -1))
        });
      }
    }
    return true;
  }
  onPressTable = table => {
    const { rootTable } = this.state;
    const { orders } = this.props;
    console.log('orders', rootTable);

    const rootOrder = orders.find(
      element => element.table._id === rootTable._id
    );
    const order = orders.find(element => element.table._id === table._id);
    if (rootTable._id === undefined) {
      console.log('order', order);
      this.props.navigation.navigate('Detail', {
        table,
        orderItem: order,
        refresh: this.refresh,
        socket: this.props.navigation.state.params.socket
      });
    } else if (table === rootTable) this.setState({ rootTable: {} });
    else if (order !== undefined && rootOrder !== undefined) {
      Alert.alert(
        'Thông báo',
        'Bạn có muốn gộp 2 bàn lại không?',
        [
          {
            text: 'OK',
            onPress: () => {
              let amount = 0;
              order.listitems = this.gatherArray(
                order.listitems,
                rootOrder.listitems
              );
              order.listitems.forEach(
                item => (amount += item.price * item.quantity)
              );
              order.amount = amount;
              this.props.updateOrder(order);
              rootTable.status = STATUS_TABLE.EMPTY;
              this.props.updateTable(rootTable);
              this.props.deleteOrder(rootOrder.id);
              const index = orders.findIndex(
                item => item._id === rootOrder._id
              );
              orders.splice(index, 1);
            }
          },
          {
            text: 'Cancel',
            onPress: () => this.setState({ rootTable: {} }),
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
    } else if (rootOrder._id !== undefined && order === undefined) {
      Alert.alert(
        'Thông báo',
        'Bạn có muốn chuyển bàn không?',
        [
          {
            text: 'OK',
            onPress: () => {
              rootOrder.table = table._id;
              this.props.updateOrder(rootOrder);
              table.status = rootTable.status;
              this.props.updateTable(table);
              rootTable.status = STATUS_TABLE.EMPTY;
              this.props.updateTable(rootTable);
            }
          },
          {
            text: 'Cancel',
            onPress: () => this.setState({ rootTable: {} }),
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
    }
  };

  onPressState = () => this.setState({ sortById: false });

  onPressId = () => this.setState({ sortById: true });

  onLongPress = item => {
    if (item.orderid !== '') {
      this.setState({ rootTable: item });
      Alert.alert('Hãy chọn bài muốn chuyển hoặc gộp');
    } else Alert.alert('Bàn rỗng không thể chuyển hoặc gộp');
  };

  setTables = tables => this.setState({ tables });

  gatherArray = (arr1, arr2) => {
    const temp1 = [...arr1];
    const temp2 = [...arr2];
    arr1.forEach((element, index) => {
      arr2.forEach((item, index1) => {
        if (item.id === element.id) {
          const temp = item;
          temp.quantity = item.quantity + element.quantity;
          temp1.splice(index, 1, temp);
          temp2.splice(index1, 1);
        }
      });
    });
    return [...temp1, ...temp2];
  };
  refresh = () => {
    this.setState({ refresh: !this.state.refresh });
  };
  renderItem = ({ item }) => (
    <Table
      rootTable={item === this.state.rootTable}
      text={item.name}
      onPress={() => this.onPressTable(item)}
      status={item.status}
      onLongPress={() => this.onLongPress(item)}
    />
  );
  render() {
    const { sortById, tables } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title="Danh sách bàn" />
        <View style={{ flex: 1 }}>
          <Image
            source={Images.background}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
          <View style={styles.change_sort_bar}>
            <Text style={{ color: '#fff', marginLeft: 10 }}>Sắp xếp</Text>
            <TouchableWithoutFeedback
              onPress={this.onPressId}
              style={[{ opacity: sortById ? 1 : 0.5 }]}
            >
              <View
                style={[
                  styles.change_sort_item,
                  { opacity: sortById ? 1 : 0.5 }
                ]}
              >
                <Text style={{ color: '#fff', marginRight: 5 }}>Thứ tự</Text>
                <Icon name={'md-arrow-dropdown'} size={30} color="#fff" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onPressState}>
              <View
                style={[
                  styles.change_sort_item,
                  { opacity: !sortById ? 1 : 0.5 }
                ]}
              >
                <Text style={{ color: '#fff', marginRight: 5 }}>
                  Trạng thái
                </Text>
                <Icon name={'md-arrow-dropdown'} size={30} color="#fff" />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {tables.length === 0 ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <FlatList
              data={tables}
              extraData={this.state}
              keyExtractor={item => item._id} //eslint-disable-line
              renderItem={this.renderItem}
              numColumns={3}
            />
          )}
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getTable: () => dispatch(getTable()),
  updateTable: table => dispatch(updateTable(table)),
  updateOrder: order => dispatch(updateOrder(order)),
  resetOrder: () => dispatch(resetOrder()),
  getOrders: () => dispatch(getOrders()),
  deleteOrder: id => dispatch(deleteOrder(id))
});

const mapStateToProps = state => ({
  tables: state.TableReducer,
  orders: state.OrderReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
