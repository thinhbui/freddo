/* eslint no-underscore-dangle: 0 */
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
// import socket from '../../services/socket';
// import socketInstance from '../../ultils/constants/socket';

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
    // socket.on(SOCKET_EVENT.IOTESTDESK, data => Alert.alert(data));
  }
  // require_pay
  componentDidMount() {
    const { tables } = this.props;
    console.log('componentDidMount Home', this.props);
    this.setState({ tables });
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
      } else {
        this.setState({
          tables: tables.sort((a, b) => (a.status > b.status ? 1 : -1))
        });
      }
    }
    return true;
  }
  onPressTable = table => {
    const { rootTable } = this.state;
    const { orders } = this.props;
    const rootOrder = orders.find(
      element =>
        element.table._id
          ? element.table._id === rootTable._id
          : element.table === rootTable._id
    );
    const order = orders.find(
      element =>
        element.table._id
          ? element.table._id === table._id
          : element.table === table._id
    );

    if (rootTable._id === undefined) {
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
              order.table = table._id;
              console.log('order', order);
              // update new order
              this.props.updateOrder(order);

              table.status =
                rootTable.status === STATUS_TABLE.WAITING
                  ? STATUS_TABLE.WAITING
                  : table.status;
              this.props.updateTable(table);
              // update status root table
              rootTable.status = STATUS_TABLE.EMPTY;
              console.log('rootTable', rootTable);
              this.props.updateTable(rootTable);

              // delete root order
              this.props.deleteOrder(rootOrder);
              this.setState({ rootTable: {} });
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
              this.setState({ rootTable: {} });
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
    console.log(arr1);
    console.log(arr2);
    arr1.forEach((element, index) => {
      arr2.forEach(item => {
        console.log(item.item, element.item);

        if (item.item === element.item) {
          const index1 = temp2.indexOf(item);
          const temp = item;
          temp.quantity = item.quantity + element.quantity;
          console.log(temp);

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
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 30 }}
            />
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
  deleteOrder: order => dispatch(deleteOrder(order))
});

const mapStateToProps = state => ({
  tables: state.TableReducer,
  orders: state.OrderReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
