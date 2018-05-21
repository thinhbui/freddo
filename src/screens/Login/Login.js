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
  AsyncStorage,
  TextInput,
  Dimensions
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
// import { width } from 'window-size';
// import socket from '../../services/socket';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const backgroundImage = require('../../ultils/images/cafe.png');
// const senderID = '711529978568';
const { width, height } = Dimensions.get('window');

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.arr = ['F', 'r', 'e', 'd', 'd', 'o'];
    this.state = {
      animations: [],
      iconAnimations: new Animated.Value(0),
      username: '',
      password: '',
      user: {},
      isFocus: false
    };
    // this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
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
        }
        this.startAnimation(user);
      }
    });
    // this.startAnimation(user);
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
  componentDidUpdate() {
    const { iconAnimations, animations } = this.state;
    if (this.state.isFocus) {
      Animated.timing(iconAnimations, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'ios'
      }).start();
    } else {
      Animated.timing(iconAnimations, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'ios'
      }).start();
    }
  }
  onFocus = () => {
    this.setState({ isFocus: true });
  };
  onBLur = () => {
    this.setState({ isFocus: false });
  };
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
    console.log(username);

    this.setState({ username });
  };
  startAnimation = user => {
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
    Animated.stagger(50, [...animationsArr]).start(() => {
      if (user.id !== undefined) this.navigationToMain();
    });
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
    const heightIcon = iconAnimations.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100]
    });
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={backgroundImage} style={styles.background_image} />
        <View style={{ flex: 1 }} />
        <View style={[styles.content]}>
          <View style={{ justifyContent: 'flex-end' }}>
            <AnimatedIcon name="ios-cafe" color="#fff" size={90} style={{}} />
          </View>
          <Animated.View
            style={[styles.freddo_layout, { opacity: iconAnimations }]}
          >
            {this.arr.map((value, index) => (
              <Animated.Text
                key={index}
                style={[styles.freddo, { opacity: animations[index] }]}
              >
                {value}
              </Animated.Text>
            ))}
          </Animated.View>
          <View style={styles.input_layout}>
            <TextInput
              style={styles.text_input}
              placeholder="Tài khoản"
              placeholderTextColor="#fff"
              onFocus={this.onFocus}
              onBlur={this.onBLur}
              underlineColorAndroid="transparent"
              onChangeText={this.onChangeUsername}
            />
            <TextInput
              style={styles.text_input}
              placeholder="Mật khẩu"
              placeholderTextColor="#fff"
              secureTextEntry
              underlineColorAndroid="transparent"
              onFocus={this.onFocus}
              onBlur={this.onBLur}
              onChangeText={this.onChangePassword}
            />
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
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
