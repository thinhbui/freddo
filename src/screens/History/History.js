import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import styles from './styles';
import { Header, HistoryItem } from '../../components';
import { getHistories } from '../../actions';

class HistoryScreen extends PureComponent {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="ios-book" size={25} color="#fff" />
  };
  state = {
    min: 0,
    max: 10,
    data: []
  };
  componentWillMount() {
    const { user } = this.props;
    const { min, max } = this.state;
    this.props.getHistories(user.userId, min, max);
  }
  componentDidMount() {
    console.log(this.props.history);
    this.setState({
      data: this.props.history
    });
  }
  renderItem = ({ item, index }) =>
    <HistoryItem item={item} index={index} navigation={this.props.navigation} />;
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Lịch sử thanh toán" />
        {
          data.length > 0 && <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        }
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.LoginReducer,
  history: state.HistoryReducer
});
const mapDispatchToProps = dispatch => ({
  getHistories: (username, min, max) =>
    dispatch(getHistories(username, min, max))
});
export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
