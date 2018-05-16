import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components';
import { COLOR } from '../../ultils/constants/color';
import { logout } from '../../actions';

class Options extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon
        name={focused ? 'ios-options' : 'ios-options-outline'}
        size={25}
        color="#fff"
      />
    ),
    header: null
  };
  componentDidMount() {}
  logout = () => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đăng xuất không?', [
      {
        text: 'Có',
        onPress: () => {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
          });
          this.props.logout();
          this.props.navigation.dispatch(resetAction);
        }
      },
      {
        text: 'Không',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
    ]);
  };
  render() {
    // const { user } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header title="Tuỳ chọn" />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200
          }}
        >
          <Icon name="ios-contact" color={COLOR.theme} size={100} />
          <Text>ASALDKJASKJLD</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: '100%',
              borderWidth: 1,
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={this.logout}
          >
            <Icon name="ios-exit-outline" size={30} style={{ margin: 5 }} />
            <Text>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapDisPatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
const mapStateToProps = state => ({
  user: state.LoginReducer
});
export default connect(mapStateToProps, mapDisPatchToProps)(Options);
