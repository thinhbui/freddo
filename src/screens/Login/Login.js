import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Platform,
    Alert,
    StatusBar
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { login, checkAlive, getToken } from '../../actions';
// import { CONSTANST } from '../../ultils/constants/String';
import styles from './styles';
import { CustomTextInput } from '../../components';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const backgroundImage = require('../../ultils/images/cafe.png');

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
            // isLogin: this.props.isLogin,
        };
    }
    componentWillMount() {
        console.log('componentWillMount isLogin', this.props.user.isLogin);
        const arrAnimated = [];
        for (let i = 0; i < this.arr.length; i++) {
            arrAnimated.push(new Animated.Value(0));
        }
        this.setState({ animations: [...arrAnimated] });
    }
    componentDidMount() {
        const { user } = this.props;
        console.log(user);
        this.startAnimation(user);
    }
    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps', newProps);
        const { user } = newProps;
        this.setState({ user });
        console.log(user);
        if (user.userId === undefined || user.userId === '') {
            Alert.alert('Lỗi đăng nhập', 'Sai tài khoản hoặc mật khẩu');
        } else {
            this.navigationToMain(newProps.user.userId);
        }
    }

    onLogin = () => {
        const { username, password } = this.state;
        if (username === '' || password === '') {
            Alert.alert('Lỗi đăng nhập', 'Bạn phải nhập tài khoản và mật khẩu');
        } else {
            this.props.login(username, password);
        }
    }
    onChangePassword = (password) => {
        this.setState({ password });
    }
    onChangeUsername = (username) => {
        this.setState({ username });
    }
    startAnimation = (user) => {
        const { iconAnimations, animations } = this.state;
        const animationsArr = this.arr.map((item, i) =>
            Animated.timing(
                animations[i],
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: Platform.OS !== 'ios',
                },
            )
        );
        Animated.timing(
            iconAnimations,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: Platform.OS !== 'ios',
            }).start();
        Animated.stagger(
            50,
            [...animationsArr]
        ).start(() => {
            if (user.userId !== undefined && user.isLogin) {
                this.navigationToMain(user.userId);
            }
        });
    }
    checkAliveAccount = (userId) => {
        console.log(userId);
        const isAlive = this.props.checkAlive(userId);
        console.log(isAlive);
    }
    navigationToMain = (userId) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main', params: { userId } })
            ],

        });
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        const { animations, iconAnimations, username, password, user } = this.state;
        return (
            <View
                style={styles.container}
            >
                <StatusBar barStyle='light-content' />
                <Image
                    source={backgroundImage}
                    style={styles.background_image}
                />
                <View style={{ flex: 1 }} />

                <View style={styles.content}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <AnimatedIcon
                            name='ios-cafe'
                            color='#fff'
                            size={90}
                            style={{ opacity: iconAnimations }}
                        />
                    </View>
                    <View style={styles.freddo_layout}>
                        {
                            this.arr.map((value, index) => (
                                <Animated.Text
                                    key={index}
                                    style={[
                                        styles.freddo,
                                        { opacity: animations[index] }]}
                                >
                                    {value}
                                </Animated.Text>
                            ))
                        }
                    </View>
                    <View style={styles.input_layout}>
                        <CustomTextInput
                            label='Tài khoản'
                            placeholder='Tài khoản'
                            text={username}
                            onTextChange={this.onChangeUsername}
                        />
                        <CustomTextInput
                            label='Mật khẩu'
                            type='pass'
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

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => { dispatch(login(username, password)); },
    checkAlive: (userId) => { dispatch(checkAlive(userId)); },
    getToken: (id) => { dispatch(getToken(id)); }
});

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.LoginReducer
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
