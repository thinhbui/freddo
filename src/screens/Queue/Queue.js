import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import styles from './styles';
import { Header, QueueItem } from '../../components';
import { STATUS_TABLE } from '../../ultils/constants/String';
/* eslint no-underscore-dangle: 0 */
class Queue extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon
        name={focused ? 'ios-alarm' : 'ios-alarm-outline'}
        size={25}
        color="#fff"
      />
    ),
    header: null
  };
  state = {
    orders: []
  };
  componentDidMount() {
    const { orders } = this.props;
    this.setOrder(orders);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    console.log('nextState', nextState);
    if (this.props !== nextProps) {
      this.setState({
        orders: nextProps.orders.filter(
          item => item.tablename || item.table.status === STATUS_TABLE.WAITING
        )
      });
      return true;
    }
    if (this.state !== nextState) return true;
    return false;
  }
  setOrder = orders => {
    this.setState({
      orders: orders.filter(item => item.table.status === STATUS_TABLE.WAITING)
    });
  };

  renderItem = ({ item, index }) => <QueueItem item={item} index={index} />;
  render() {
    const { orders } = this.state;
    console.log(orders);

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title="Hàng đợi" />

        {orders.length === 0 ? (
          <Text style={{ fontSize: 16, alignSelf: 'center' }}>
            Không có bàn nào đang đợi
          </Text>
        ) : (
          <FlatList
            data={orders}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);

  return { orders: state.OrderReducer };
};

export default connect(mapStateToProps)(Queue);
