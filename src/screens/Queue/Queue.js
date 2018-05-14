import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import styles from './styles';
import { Header, QueueItem } from '../../components';

class Queue extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="ios-clock" size={25} color="#fff" />,
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
  setOrder = orders => {
    this.setState({ orders });
  };
  componentWillFocus() {
    console.log('Queue componentWillFocus');
  }
  componentDidFocus() {
    // const {} = this.props;
    console.log('Queue componentDidFocus');
  }
  renderItem = ({ item, index }) => {
    // console.log(index);
    return <QueueItem item={item} index={index} />;
  };
  render() {
    const { orders } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title="Hàng đợi" />
        <FlatList
          data={orders}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  orders: state.OrderReducer
});

export default connect(mapStateToProps)(Queue);
