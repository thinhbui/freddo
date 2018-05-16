import React, { Component } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert
  // Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client/dist/socket.io.js';
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
    this.socket = io('http://192.168.38.1:3000', { jsonp: false });
    this.state = {
      sortById: true,
      tables: [],
      refresh: false,
      changeTable: false,
      rootTable: {}
    };
  }

  componentWillMount() {
    console.log('WillMount Home');
    this.props.getTable();
    this.props.getOrders();
  }

  componentDidMount() {
    const { tables } = this.props;
    console.log('componentDidMount Home', tables);

    if (tables.length === 0) this.props.getTable();
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
          tables: tables.sort((a, b) => (a.id > b.id ? 1 : -1))
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

    const rootOrder = orders.find(element => element.id === rootTable.orderid);
    const order = orders.find(element => element.id === table.orderid);
    if (rootTable.id === undefined) {
      console.log('order', order);
      this.props.navigation.navigate('Detail', {
        table,
        orderItem: order,
        refresh: this.refresh
      });
    } else if (table === rootTable) this.setState({ rootTable: {} });
    else if (rootTable.orderid !== '' && table.orderid !== '') {
      Alert.alert(
        'Thông báo',
        'Bạn có muốn gộp 2 bàn lại không?',
        [
          {
            text: 'OK',
            onPress: () => {
              let amount = 0;
              order.listItems = this.gatherArray(
                order.listItems,
                rootOrder.listItems
              );
              order.listItems.forEach(
                item => (amount += item.price * item.quantity)
              );
              order.amount = amount;
              this.props.updateOrder(order);
              rootTable.status = false;
              rootTable.orderid = '';
              this.props.updateTable(rootTable);
              this.props.deleteOrder(rootTable.orderid);
              const index = orders.findIndex(
                item => item.id === rootTable.orderid
              );
              orders.splice(index, 1);
            }
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
    } else if (rootTable.orderid !== '' && table.orderid === '') {
      Alert.alert(
        'Thông báo',
        'Bạn có muốn chuyển bàn không?',
        [
          {
            text: 'OK',
            onPress: () => {
              table.orderid = rootTable.orderid;
              this.props.updateTable(rootTable);
              rootTable.orderid = '';
              this.props.updateTable(rootTable);
            }
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
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
              keyExtractor={item => item.id}
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
