import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';
import { Header, HistoryItem } from '../../components';
import { getHistory } from '../../actions';

class HistoryScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon
        name={focused ? 'ios-book' : 'ios-book-outline'}
        size={25}
        color="#fff"
      />
    )
  };
  state = {
    data: [],
    page: 1
  };
  componentWillMount() {
    this.props.getHistory(this.state.page, 20);
  }
  componentDidMount() {
    const { history } = this.props;
    this.setState({
      data: history
    });
  }
  shouldComponentUpdate(nextProps) {
    console.log(nextProps);

    if (nextProps !== this.props) {
      this.setState({ data: nextProps.history });
    }
    return true;
  }

  componentWillUnmount() {}
  renderItem = ({ item, index }) => (
    <HistoryItem item={item} index={index} navigation={this.props.navigation} />
  );
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Lịch sử thanh toán" />
        {data.length > 0 && (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            onEndReached={() => console.log('onEndReached')}
            onEndReachedThreshold={0.7}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.LoginReducer,
  history: state.HistoryReducer
});

const mapDispatchToProps = dispatch => ({
  getHistory: (page, perPage) => dispatch(getHistory(page, perPage))
});
export default connect(mapStateToProps, mapDispatchToProps)(
  withNavigationFocus(HistoryScreen)
);
