import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert
  // BackHandler
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import moment from 'moment';
import { Header } from '../../components';
import BillItem from '../../components/BillItems';
import styles from './styles';
import { getOrder, postOrder, updateTable, updateOrder } from '../../actions';
import { COLOR } from '../../ultils/constants/color';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deleteKey: -1,
      order: {},
      refresh: true
    };
    this.amount = 0;
  }
  componentWillMount() {
    const { table } = this.props.navigation.state.params;
    const { orders } = this.props;

    if (table.orderid !== '') {
      const order = orders.filter(item => item.id === table.orderid)[0];
      console.log('orders', order);
      order.id = table.orderid;
      this.setState({
        order
      });
    }
  }

  componentDidUpdate() {
    // this.setData();
  }
  componentWillUnmount() {
    // this.props.resetOrder();
    this.props.navigation.state.params.refresh();
  }
  onSavePress = () => {
    const { order } = this.state;
    const { table } = this.props.navigation.state.params;
    order.username = 'thinhbd';
    order.billdate = moment().format();
    order.status = false;
    if (order.listItems !== 0 && table.orderid === '') {
      if (order.listItems.length > 0) this.props.postOrder(order, table);
      else Alert.alert('Thông báo', 'Không có gì để lưu');
    }
    if (table.orderid !== '') {
      if (order.listItems.length === 0) this.props.deleteOrder();
      else this.props.updateOrder(order);
    }
    this.props.navigation.goBack();
  };
  onPayPress = () => {
    const { order } = this.state;
    const { table } = this.props.navigation.state.params;
    console.log('onPayPress', order);
    if (order.id !== '' && order.id !== undefined) {
      order.status = true;
      this.props.updateOrder(order);
      table.status = false;
      table.orderid = '';
      this.props.updateTable(table);
    } else Alert.alert('Thông báo', 'Bàn trống không thể thanh toán');
    this.props.navigation.goBack();
  };
  onSwipeRight(index) {
    this.setState({ deleteKey: index });
    this.props.deleteItemOrder(index);
  }
  onChangeQuantity = item => {
    const { order, refresh } = this.state;
    const index = order.listItems.findIndex(i => i.id === item.id);
    order.listItems.splice(index, 1, item);
    order.amount = this.calAmount(order.listItems);

    this.setState({ refresh: !refresh, order });
  };
  refresh = itemsSelected => {
    const { order, refresh } = this.state;
    order.listItems = itemsSelected;
    order.amount = this.calAmount(itemsSelected);
    this.setState({ refresh: !refresh, order });
  };

  calAmount = list => {
    let amount = 0;
    list.forEach(item => {
      amount += item.price * item.quantity;
    });
    return amount;
  };
  navigationToMenu = () => {
    const { order } = this.state;
    this.props.navigation.navigate('MenuOrder', {
      listItems: order.listItems !== undefined ? order.listItems : [],
      username: '',
      refresh: this.refresh,
      detail: true
    });
  };
  renderItem = ({ item, index }) => (
    <BillItem
      item={item}
      index={index}
      onChangeQuantity={this.onChangeQuantity}
      canChange={this.props.navigation.state.params.table.id !== undefined}
      onSwipeRight={() => this.onSwipeRight(index)}
    />
  );
  renderColumn = () => (
    <View style={styles.header_column}>
      <View style={{ flex: 3, alignItems: 'center' }}>
        <Text style={{}}>Tên</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{}}>Đơn giá</Text>
      </View>
      <View style={{ flex: 1.5, alignItems: 'center' }}>
        <Text style={{}}>Số lượng</Text>
      </View>
    </View>
  );
  render() {
    const { table } = this.props.navigation.state.params;
    const { order } = this.state;
    console.log('order', order.amount);
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={table.id === undefined ? 'Chi tiết hoá đơn' : 'Chi tiết bàn'}
          arrow
          onArrowPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{ flex: 1, width: '100%' }}>
          {this.renderColumn()}
          {order.listItems !== undefined &&
            order.listItems.length > 0 && (
              <FlatList
                data={order.listItems}
                extraData={this.state}
                keyExtractor={item => item.code}
                renderItem={this.renderItem}
              />
            )}
        </View>

        <View style={styles.add_button_layout}>
          <TouchableOpacity
            style={styles.add_button}
            onPress={this.navigationToMenu}
          >
            <Text style={{ color: '#fff' }}> Thêm đồ </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.add_button, { backgroundColor: COLOR.light_theme }]}
            onPress={this.onSavePress}
          >
            <Text style={{ color: '#fff' }}> Lưu lại </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <View style={{ flex: 2, height: '100%' }}>
            <View>
              <Text style={{ fontSize: 16, marginTop: 5 }}>Tổng tiền</Text>
            </View>
            <View
              style={{
                alignItems: table.id !== undefined ? 'flex-start' : 'flex-end',
                marginRight: 15
              }}
            >
              <Text style={{ color: COLOR.theme, fontSize: 23 }}>
                {order.amount !== undefined ? order.amount : 0}đ
              </Text>
            </View>
          </View>
          {table.id !== undefined && (
            <TouchableOpacity
              style={styles.save_button}
              onPress={this.onPayPress}
            >
              <Text style={{ color: '#fff' }}>Thanh toán</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getOrder: id => dispatch(getOrder(id)),
  postOrder: (order, table) => dispatch(postOrder(order, table)),
  updateOrder: order => dispatch(updateOrder(order)),
  updateTable: table => dispatch(updateTable(table))
});
const mapStateToProps = state => ({
  orders: state.OrderReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
