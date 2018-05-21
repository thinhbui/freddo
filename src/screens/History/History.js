import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';
import { Header, HistoryItem } from '../../components';
import { getHistory, getHistoryByUser } from '../../actions';

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
    page: 0,
    refresh: false
  };
  componentWillMount() {
    const { user } = this.props.navigation.state.params;
    const { history } = this.props;
    console.log(user);
    if (user && history.personal.length === 0)
      this.props.getHistoryByUser(this.state.page, 15, user._id);
    else this.props.getHistory(this.state.page, 15);
  }
  componentDidMount() {
    const { history } = this.props;
    const { user } = this.props.navigation.state.params;
    if (user) {
      this.setState({
        data: history.personal
      });
    } else {
      this.setState({
        data: history.history
      });
    }
  }
  shouldComponentUpdate(nextProps) {
    const { user } = this.props.navigation.state.params;
    if (nextProps !== this.props) {
      if (user) {
        this.setState({
          data: nextProps.history.personal,
          refresh: false
        });
      } else {
        this.setState({
          data: nextProps.history.history,
          refresh: false
        });
      }
    }
    return true;
  }

  componentWillUnmount() {}
  _onEndReaced = () => {
    const { user } = this.props.navigation.state.params;
    if (user) this.props.getHistoryByUser(this.state.page + 1, 15, user._id);
    else this.props.getHistory(this.state.page + 1, 15);
    this.setState({ refresh: true, page: this.state.page + 1 });
  };

  renderItem = ({ item, index }) => (
    <HistoryItem item={item} index={index} navigation={this.props.navigation} />
  );
  render() {
    const { data } = this.state;
    const { user } = this.props.navigation.state.params;
    // console.log(user);
    return (
      <View style={styles.container}>
        <Header
          title="Lịch sử thanh toán"
          arrow={user !== undefined}
          onArrowPress={() => {
            this.props.navigation.goBack();
          }}
        />
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            refreshing={this.state.refresh}
            onEndReached={this._onEndReaced}
            onEndReachedThreshold={0.9}
          />
        ) : (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
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
  getHistory: (page, perPage) => dispatch(getHistory(page, perPage)),
  getHistoryByUser: (page, perPage, userId) =>
    dispatch(getHistoryByUser(page, perPage, userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(
  withNavigationFocus(HistoryScreen)
);
