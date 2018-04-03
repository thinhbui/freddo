import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
    Platform,
    AsyncStorage,
    Alert,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CONSTANST } from '../../ultils/constants/String';
import styles from './styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const { width, height } = Dimensions.get('window');

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.arr = ['F', 'r', 'e', 'd', 'd', 'o'];
        this.state = {
            animations: [],
            iconAnimations: new Animated.Value(0),
            username: '',
            password: '',
            userId: '',
            error: ''
        };
    }
    componentWillMount() {
        AsyncStorage.getItem(CONSTANST.USER_ID, (error, result) => {
            if (error) {
                console.log('error');
                console.log(error);
            } else if (result !== '' && result !== null) {
                console.log(result);
                this.setState({ userId: result });
                setTimeout(() => {
                    this.props.navigation.navigate('Main');
                }, 500);
            }
        });
        const arrAnimated = [];
        for (let i = 0; i < this.arr.length; i++) {
            arrAnimated.push(new Animated.Value(0));
        }
        this.setState({ animations: [...arrAnimated] });
    }
    componentDidMount() {
        this.startAnimation();
    }

    onLogin = () => {
        const { username, password } = this.state;
        // fetch('https://freddocf-cyberjunky.c9users.io/api/accounts/login', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password })
        // }).then((response) => response.json())
        //     .then((resposeJson) => {
        //         console.log(resposeJson);
        //         console.log(resposeJson.userId);
        //         if (resposeJson.userId !== undefined) {
        //             AsyncStorage.setItem(CONSTANST.USER_ID, JSON.stringify(resposeJson.userId), (error) => {
        //                 console.log(error);
        //             });
        //             this.props.navigation.navigate('Main');
        //         } else {
        //             this.setState({ error: 'Tài khoản hoặc mật khẩu không đúng' });
        //             AsyncStorage.setItem(CONSTANST.USER_ID, JSON.stringify(''), (error) => {
        //                 console.log(error);
        //             });
        //             alert('Sai tài khoản hoặc mật khẩu');
        //         }
        //     })
        //     .catch((error) => {
        //         this.setState({ error: error.message });
        //         alert(error.message);
        //     });
        // console.log(JSON.stringify({ username, password }));
        this.props.navigation.navigate('Main');
    }
    onChangePassword = (password) => {
        this.setState({ password });
    }
    onChangeUsername = (username) => {
        this.setState({ username });
    }
    startAnimation = () => {
        const { iconAnimations, animations, userId } = this.state;
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
        ).start();
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
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#fff'
                            placeholder='username'
                            onChangeText={this.onChangeUsername}
                            style={{ paddingLeft: 10, color: '#fff', width: '80%', backgroundColor: 'transparent', borderColor: '#FFf', borderWidth: 3, borderRadius: 5 }}
                        />

                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#fff'
                            placeholder='password'
                            onChangeText={this.onChangePassword}
                            style={{ paddingLeft: 10, color: '#fff', width: '80%', backgroundColor: 'transparent', borderColor: '#FFf', borderWidth: 3, borderRadius: 5 }}
                            secureTextEntry={true}
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
