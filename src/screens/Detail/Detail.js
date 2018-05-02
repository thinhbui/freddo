import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { BillItem, Header } from '../../components';
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
    console.log(table);

    if (table.orderid !== '') this.props.getOrder(table.orderid);
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
  onSwipeRight(index) {
    this.setState({ deleteKey: index });
    this.props.deleteItemOrder(index);
  }

  onSavePress = () => {
    const { order } = this.props;
    const { table } = this.props.navigation.state.params;
    let result = {};
    order.billdate = moment().format();
    // let amount = 0;
    order.listItems.map(item => (this.amount += item.quantity * item.price));
    order.amount = this.amount;
    if (order.listItems.length > 0 && table.orderid === '') {
      result = this.props.postOrder(order);
    }
    if (table.orderid !== '') {
      if (order.listItems.length === 0) this.props.deleteOrder();
      else this.props.updateOrder(order);
    }
    table.status = true;
    table.orderid = result.orderid;
    this.props.updateTable(table);
    this.props.resetOrder();
    this.props.navigation.goBack();
    this.props.getTable();
  };
  onOutPress = () => {
    const { order } = this.props;
    const { table } = this.props.navigation.state.params;
    order.status = true;
    // this.props.updateOrder(order);
    table.status = false;
    this.props.updateTable(table);
    this.props.navigation.goBack();
    this.props.getTable();
  };
  setData = () => {
    const { order } = this.props;
    this.setState({ data: order.listItems });
    this.amount = order.amount;
  };
  refresh = () => {
    console.log('refresh');
    this.setState({ refresh: !this.refresh });
    this.amount = 0;
    this.props.order.listItems.map(
      item => (this.amount += item.quantity * item.price)
    );
  };
  navigationToMenu = () => {
    BackHandler.removeEventListener('backHome', this.backHandler);
    this.props.navigation.navigate('MenuOrder', {
      orderId: '',
      username: '',
      refresh: this.refresh,
      detail: true
    });
  };
  renderItem = ({ item, index }) => (
    <BillItem
      name={item.name}
      price={20}
      quantity={item.quantity}
      index={index}
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
    console.log('table', table);
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Chi tiết bàn"
          arrow
          onArrowPress={() => this.props.navigation.goBack()}
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
          {/* <TouchableOpacity style={styles.save_button} onPress={this.onSavePress} >
                        <Text style={{ color: '#fff' }}>Lưu</Text>
                    </TouchableOpacity> */}
          <View style={{ flex: 2, height: '100%' }}>
            <View>
              <Text style={{ fontSize: 16 }}>Tổng tiền</Text>
            </View>
            <View>
              <Text style={{ color: COLOR.theme, fontSize: 23 }}>
                {this.amount}
              </Text>
            </View>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: '#fff' }} />
          <TouchableOpacity
            style={styles.save_button}
            onPress={this.onOutPress}
          >
            <Text style={{ color: '#fff' }}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getOrder: id => dispatch(getOrder(id)),
  addNewOrder: order => dispatch(addNewOrder(order)),
  deleteItemOrder: index => dispatch(deleteItemOrder(index)),
  postOrder: order => dispatch(postOrder(order)),
  resetOrder: () => dispatch(resetOrder()),
  updateOrder: order => dispatch(updateOrder(order)),
  updateTable: table => dispatch(updateTable(table)),
  getTable: () => dispatch(getTable())
});
const mapStateToProps = state => ({
  order: state.OrderReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
