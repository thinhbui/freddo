import React, { PureComponent } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '../../components';
import BillItem from '../../components/BillItems';
import styles from './styles';
import { postOrder, updateTable, updateOrder } from '../../actions';
import { COLOR } from '../../ultils/constants/color';
import { STATUS_TABLE } from '../../ultils/constants/String';
/* eslint no-underscore-dangle: 0 */
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
    const { orderItem, socket } = this.props.navigation.state.params;
    console.log('socket.props', socket);
    if (orderItem) {
      this.setState({ order: orderItem });
    }
  }

  componentDidUpdate() {}
  componentWillUnmount() {
    if (this.props.navigation.state.params.table !== undefined) {
      this.props.navigation.state.params.refresh();
    }
  }
  onSavePress = () => {
    const { order } = this.state;
    console.log(this.props.user);
    const { table, orderItem, socket } = this.props.navigation.state.params;
    if (
      orderItem === undefined &&
      order.listitems &&
      order.listitems.length > 0
    ) {
      order.user = this.props.user.id;
      order.status = false;
      order.table = table._id;
      order.tablename = table.name;
      table.status = STATUS_TABLE.WAITING;
      this.props.postOrder(order, socket);
      this.props.updateTable(table);
    } else if (order.listitems.length === 0) {
      Alert.alert('Thông báo', 'Không có gì để lưu');
    }
    if (orderItem !== undefined) {
      if (order.listitems.length === 0) this.props.deleteOrder();
      else {
        this.props.updateOrder(order);
      }
    }
    this.props.navigation.goBack();
  };
  onPayPress = () => {
    const { socket, table } = this.props.navigation.state.params;
    const { order } = this.state;
    // console.log('onPayPress', order);
    if (order.listitems && order.listitems.length > 0) {
      order.user = this.props.user.id;
      order.status = true;
      order.table = table._id;
      this.props.updateOrder(order, socket);
      this.props.navigation.goBack();
    } else if (order.listitems && order.listitems.length === 0) {
      Alert.alert('Thông báo', 'Bàn trống không thể thanh toán');
    }
  };
  onSwipeRight(index) {
    const { order } = this.state;
    order.listitems.splice(index, 1);
    order.amount = this.calAmount(order.listitems);
    this.setState({ order, deleteKey: index });
  }
  onChangeQuantity = item => {
    const { order, refresh } = this.state;
    const index = order.listitems.findIndex(i => i.id === item.id);
    order.listitems.splice(index, 1, item);
    order.amount = this.calAmount(order.listitems);

    this.setState({ refresh: !refresh, order });
  };
  formatNumber = x => `${x.toLocaleString('vn-VI')}đ`;
  refresh = itemsSelected => {
    const { order, refresh } = this.state;
    order.listitems = itemsSelected;
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
      listitems: order.listitems !== undefined ? order.listitems : [],
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
      canChange={this.props.navigation.state.params.table !== undefined}
      onSwipeRight={() => this.onSwipeRight(index)}
    />
  );
  renderColumn = () => (
    <View style={styles.header_column}>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{}}>Tên</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{}}>Đơn giá</Text>
      </View>
      <View
        style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{}}>Số lượng</Text>
      </View>
    </View>
  );
  render() {
    const { table } = this.props.navigation.state.params;
    const { order } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={table === undefined ? 'Chi tiết hoá đơn' : 'Chi tiết bàn'}
          arrow
          onArrowPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={{ flex: 1, width: '100%' }}>
          {this.renderColumn()}
          {order.listitems !== undefined &&
            order.listitems.length > 0 && (
              <FlatList
                data={order.listitems}
                extraData={this.state}
                keyExtractor={item => item.item}
                renderItem={this.renderItem}
              />
            )}
        </View>

        {table && (
          <View style={styles.add_button_layout}>
            <TouchableOpacity
              style={styles.add_button}
              onPress={this.navigationToMenu}
            >
              <Text style={{ color: '#fff' }}> Thêm đồ </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.add_button,
                { backgroundColor: COLOR.light_theme }
              ]}
              onPress={this.onSavePress}
            >
              <Text style={{ color: '#fff' }}> Lưu lại </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.button}>
          <View style={{ flex: 2, height: '100%' }}>
            <View>
              <Text style={{ fontSize: 16, marginTop: 5 }}>Tổng tiền</Text>
            </View>
            <View
              style={{
                alignItems: table !== undefined ? 'flex-start' : 'flex-end',
                marginRight: 15
              }}
            >
              <Text style={{ color: COLOR.theme, fontSize: 23 }}>
                {order.amount !== undefined
                  ? this.formatNumber(order.amount)
                  : 0}
              </Text>
            </View>
          </View>
          {table !== undefined && (
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
  postOrder: (order, table) => dispatch(postOrder(order, table)),
  updateOrder: (order, socket) => dispatch(updateOrder(order, socket)),
  updateTable: table => dispatch(updateTable(table))
});
const mapStateToProps = state => ({
  user: state.LoginReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
