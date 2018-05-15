import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';
import { Header, HistoryItem } from '../../components';
import { getHistory, getNewHistory } from '../../actions';

class HistoryScreen extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="ios-book" size={25} color="#fff" />
  };
  state = {
    min: 0,
    max: 10,
    data: []
  };
  componentWillMount() {
    const { min, max } = this.state;
    this.props.getNewHistory(min, max);
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
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state);

  return {
    user: state.LoginReducer,
    history: state.HistoryReducer
  };
};
const mapDispatchToProps = dispatch => ({
  getHistory: (min, max) => dispatch(getHistory(min, max)),
  getNewHistory: (min, max) => dispatch(getNewHistory(min, max))
});
export default connect(mapStateToProps, mapDispatchToProps)(
  withNavigationFocus(HistoryScreen)
);
