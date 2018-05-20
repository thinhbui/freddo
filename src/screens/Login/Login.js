import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  Alert,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import styles from './styles';
import { CustomTextInput } from '../../components';
import { login, loginSuccess, getOrders, getTable } from '../../actions';
import { STORAGE } from '../../ultils/constants/String';

// import socket from '../../services/socket';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const backgroundImage = require('../../ultils/images/cafe.png');

// const senderID = '711529978568';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.arr = ['F', 'r', 'e', 'd', 'd', 'o'];
    this.state = {
      animations: [],
      iconAnimations: new Animated.Value(0),
      username: '',
      password: '',
      user: {}
    };
  }
  componentWillMount() {
    const arrAnimated = [];
    for (let i = 0; i < this.arr.length; i++) {
      arrAnimated.push(new Animated.Value(0));
    }
    this.setState({ animations: [...arrAnimated] });
  }
  componentDidMount() {
    AsyncStorage.getItem(STORAGE.USER, (err, res) => {
      if (err) console.log(err);
      else if (res !== null) {
        const user = JSON.parse(res);
        if (user.exp && user.exp > moment().unix()) {
          console.log(user);
          if (user.token) {
            axios.defaults.headers.common.Authorization = user.token;
          }
          this.props.setUser(user);
          this.navigationToMain();
        }
      }
    });
    this.startAnimation();
  }
  componentWillReceiveProps(newProps) {
    const { user } = newProps;
    console.log('user', user);
    if (user.id !== undefined) {
      this.navigationToMain();
      this.props.getOrders();
      this.props.getTable();
    } else {
      Alert.alert('Thông báo', 'Đăng nhập không thành công');
    }
  }

  onLogin = () => {
    const { username, password } = this.state;
    if (username === '' || password === '') {
      Alert.alert('Lỗi đăng nhập', 'Bạn phải nhập tài khoản và mật khẩu');
    } else {
      this.props.onLogin(username.trim(), password);
    }
  };
  onChangePassword = password => {
    this.setState({ password });
  };
  onChangeUsername = username => {
    this.setState({ username });
  };
  startAnimation = () => {
    const { iconAnimations, animations } = this.state;
    const animationsArr = this.arr.map((item, i) =>
      Animated.timing(animations[i], {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'ios'
      })
    );
    Animated.timing(iconAnimations, {
      toValue: 1,
      duration: 500,
      useNativeDriver: Platform.OS !== 'ios'
    }).start();
    Animated.stagger(50, [...animationsArr]).start();
  };

  navigationToMain = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Main',
          params: {}
        })
      ]
    });
    console.log(this.props.navigation);

    this.props.navigation.dispatch(resetAction);
  };
  render() {
    const { animations, iconAnimations, username, password } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={backgroundImage} style={styles.background_image} />
        <View style={{ flex: 1 }} />

        <View style={styles.content}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <AnimatedIcon
              name="ios-cafe"
              color="#fff"
              size={90}
              style={{ opacity: iconAnimations }}
            />
          </View>
          <View style={styles.freddo_layout}>
            {this.arr.map((value, index) => (
              <Animated.Text
                key={index}
                style={[styles.freddo, { opacity: animations[index] }]}
              >
                {value}
              </Animated.Text>
            ))}
          </View>
          <View style={styles.input_layout}>
            <CustomTextInput
              label="Tài khoản"
              placeholder="Tài khoản"
              text={username}
              onTextChange={this.onChangeUsername}
            />
            <CustomTextInput
              label="Mật khẩu"
              type="pass"
              text={password}
              onTextChange={this.onChangePassword}
            />
            <TouchableOpacity style={styles.button} onPress={this.onLogin}>
              <Text style={styles.text_button}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password) => dispatch(login(username, password)),
  setUser: user => dispatch(loginSuccess(user)),
  getOrders: () => dispatch(getOrders()),
  getTable: () => dispatch(getTable())
});

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.LoginReducer
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
