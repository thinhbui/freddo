import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
    Platform,
    
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { login, checkAlive } from '../../actions';
// import { CONSTANST } from '../../ultils/constants/String';
import styles from './styles';
import { CustomTextInput } from '../../components';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.arr = ['F', 'r', 'e', 'd', 'd', 'o'];
        this.state = {
            animations: [],
            iconAnimations: new Animated.Value(0),
            username: '',
            password: '',
            userId: '',
            error: '',
            // isLogin: this.props.isLogin,
        };
    }
    componentWillMount() {
        const { user } = this.props;
        console.log('componentWillMount isLogin', this.props.user.isLogin);
        // if (user.isLogin) {
        //     this.checkAliveAccount(user.userId);
        // }
        const arrAnimated = [];
        for (let i = 0; i < this.arr.length; i++) {
            arrAnimated.push(new Animated.Value(0));
        }
        this.setState({ animations: [...arrAnimated] });
    }
    componentDidMount() {
        const { user } = this.props;
        this.startAnimation(user);
    }
    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps', newProps);
        // this.setState({ isLogin: newProps.LoginReducer.isLogin });
        // if (newProps.StatusReducer === undefined) {
        //     console.log('1');
        // } else if (newProps.StatusReducer === null || newProps.StatusReducer.length === 0) {
        //     console.log('2');
        // } else {
        //     console.log('newProps.StatusReducer', newProps.LoginReducer.isLogin);
        //     // this.setState({ isLogin:  });
        // }
    }

    onLogin = () => {
        const { username, password } = this.state;
        // console.log(this.props);
        const loginResult = this.props.login(username, password);
        this.navigationToMain();
        console.log(loginResult);
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

        });
    }
    checkAliveAccount = (userId) => {
        // const { user } = this.props;
        console.log(userId);
        const isAlive = this.props.checkAlive(userId);
        console.log(isAlive);
    }
    navigationToMain = (userId) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                //the userMain who is loging in app
                NavigationActions.navigate({ routeName: 'Main', params: { userId } })
            ],

        });
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        const { animations, iconAnimations, username, error } = this.state;
        return (
            <View
                style={styles.container}
            >
                <Image
                    source={require('../../ultils/images/cafe.png')}
                    style={styles.background_image}
                />
                <View style={{ flex: 1 }}>

                </View>
                <View style={styles.content}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <AnimatedIcon name='ios-cafe' color='#fff' size={90} style={{ opacity: iconAnimations }} />
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'flex-start' }}>
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
                    <View style={{ flex: 2, width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <CustomTextInput
                            label='Tài khoản'
                            placeholder='Tài khoản'
                        />
                        <CustomTextInput
                            label='Mật khẩu'
                            type='pass'
                        />
                        <TouchableOpacity style={{ width: '60%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 20 }} onPress={this.onLogin}>
                            <Text style={{ color: '#000000', fontWeight: 'bold' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => { dispatch(login(username, password)); },
    checkAlive: (userId) => { dispatch(checkAlive(userId)); }
});

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.LoginReducer
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
