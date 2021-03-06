import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components';
import { COLOR } from '../../ultils/constants/color';
import { logout, getMenu } from '../../actions';
import { STORAGE } from '../../ultils/constants/String';

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

  onPressHistory = () => {
    this.props.navigation.navigate('HistoryPersonal', {
      user: this.props.user
    });
  };
  onReload = () => {
    this.props.getMenu();
  };
  logout = () => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đăng xuất không?', [
      {
        text: 'Có',
        onPress: () => {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
          });
          AsyncStorage.removeItem(STORAGE.USER);
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
    const { user } = this.props;
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
          <Text>{user.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: '100%',
              marginRight: 15
            }}
            onPress={this.onPressHistory}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View
                style={{
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name="ios-clipboard-outline" size={30} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  borderBottomWidth: 1,
                  height: '100%'
                }}
              >
                <Text>Lịch sử cá nhân</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: '100%'
            }}
            onPress={this.onReload}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View
                style={{
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name="ios-refresh-outline" size={30} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  borderBottomWidth: 1,
                  height: '100%'
                }}
              >
                <Text>Cập nhật menu</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: '100%'
            }}
            onPress={this.logout}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <View
                style={{
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name="ios-exit-outline" size={30} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  borderBottomWidth: 1,
                  height: '100%'
                }}
              >
                <Text>Đăng xuất</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapDisPatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getMenu: () => dispatch(getMenu())
});
const mapStateToProps = state => ({
  user: state.LoginReducer
});
export default connect(mapStateToProps, mapDisPatchToProps)(Options);
