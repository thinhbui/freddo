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

import {
  getOrder,
  addNewOrder,
  deleteItemOrder,
  postOrder,
  resetOrder,
  updateTable,
  updateOrder,
  getTable
} from '../../actions';
import { COLOR } from '../../ultils/constants/color';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deleteKey: -1,
      orderState: {},
      data: [],
      refresh: true
    };
    this.amount = 0;
  }
  componentWillMount() {
    const { table } = this.props.navigation.state.params;
    if (table.orderid !== '') { this.props.getOrder(table.orderid); }
  }
  componentDidMount() {
    this.setData();
  }
  componentWillReceiveProps(newProps) {
    this.setState({ data: newProps.order.listItems });
  }
  componentDidUpdate() {
    this.setData();
  }
  componentWillUnmount() {
    this.props.resetOrder();
    this.props.navigation.state.params.refresh();
  }
  onSavePress = () => {
    this.props.navigation.goBack();
    const { order } = this.props;
    const { table } = this.props.navigation.state.params;
    // let result = {};
    order.billdate = moment().format();
    order.listItems.map(item => (this.amount += item.quantity * item.price));
    order.amount = this.amount;
    if (order.listItems.length > 0 && table.orderid === '') {
      this.props.postOrder(order, table)
        .then(res => {
          if (res.error) {
            Alert.alert(res.error.message);
            return;
          }
          table.orderid = res.id;
          table.status = true;
          this.props.updateTable(table);
        });
    }
    if (table.orderid !== '') {
      if (order.listItems.length === 0) this.props.deleteOrder();
      else this.props.updateOrder(order);
      this.props.navigation.state.params.refresh();
    }
  };
  onPayPress = () => {
    const { order } = this.props;
    const { table } = this.props.navigation.state.params;
    console.log(order);
    this.props.navigation.goBack();

    if (order.id !== '' && order.id !== undefined) {
      order.status = true;
      this.props.updateOrder(order);
      table.status = false;
      table.orderid = '';
      this.props.updateTable(table);
      console.log('table', table);
      this.props.navigation.state.params.refresh();
    } else Alert.alert('Thông báo', 'Bàn trống không thể thanh toán');
  };

  onSwipeRight(index) {
    this.setState({ deleteKey: index });
    this.props.deleteItemOrder(index);
  }

  setData = () => {
    const { order } = this.props;
    console.log('order', order);
    this.setState({ data: order.listItems, amount: order.amount });
  };
  refresh = () => {
    console.log('this.refresh');
    const { order } = this.props;
    this.setState({ refresh: !this.refresh, amount: order.amount });
  };
  navigationToMenu = () => {
    this.props.navigation.navigate('MenuOrder', {
      orderid: '',
      username: '',
      refresh: this.refresh,
      detail: true
    });
  };
  renderItem = ({ item, index }) => (
    <BillItem
      item={item}
      index={index}
      refresh={() => this.setState({ refresh: !this.state.refresh })}
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
    const { data } = this.state;
    // console.log('table', data);
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
          {data.length > 0 && (
            <FlatList
              data={data}
              extraData={this.state}
              keyExtractor={item => item.code}
              renderItem={this.renderItem}
            />
          )}
        </View>
        {table.id !== undefined && <View style={styles.add_button_layout}>
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
        </View>}
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
                {this.state.amount}đ
              </Text>
            </View>
          </View>
          {table.id !== undefined &&
            <TouchableOpacity
              style={styles.save_button}
              onPress={this.onPayPress}
            >
              <Text style={{ color: '#fff' }}>Thanh toán</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getOrder: id => dispatch(getOrder(id)),
  addNewOrder: order => dispatch(addNewOrder(order)),
  deleteItemOrder: index => dispatch(deleteItemOrder(index)),
  postOrder: (order, table) => dispatch(postOrder(order, table)),
  resetOrder: () => dispatch(resetOrder()),
  updateOrder: order => dispatch(updateOrder(order)),
  updateTable: table => dispatch(updateTable(table)),
  getTable: () => dispatch(getTable())
});
const mapStateToProps = state => ({
  order: state.OrderReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
