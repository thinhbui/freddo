import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import styles from './styles';
import { Header, QueueItem } from '../../components';
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
    this.props.navigation.addListener('didFocus', () =>
      console.log('did focus')
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    console.log('nextState', nextState);
    if (this.props !== nextProps) {
      this.setState({ orders: nextProps.orders });
      return true;
    }
    if (this.state !== nextState) return true;
    return false;
  }
  setOrder = orders => {
    this.setState({ orders });
  };

  renderItem = ({ item, index }) => <QueueItem item={item} index={index} />;
  render() {
    const { orders } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title="Hàng đợi" />
        <FlatList
          data={orders}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);

  return { orders: state.OrderReducer };
};

export default connect(mapStateToProps)(Queue);
