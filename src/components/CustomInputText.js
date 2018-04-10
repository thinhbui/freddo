import React, { PureComponent } from 'react';
import { View, Text, TextInput, Animated, Platform, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

class CustomTextInput extends PureComponent {
    state = {
        text: '',
        animation: new Animated.Value(0),
        isForcus: false
    }
    componentDidUpdate() {
        const { isForcus } = this.state;
        console.log(isForcus);
        if (this.state.text === '') {
            Animated.timing(
                this.state.animation,
                {
                    toValue: isForcus ? 1 : 0,
                    duration: 500,
                    useNativeDriver: Platform.OS === 'android'
                }
            ).start();
        }
    }
    render() {
        const { label, type, textInputStyle, style } = this.props;
        const { animation, text } = this.state;
        const textStyle = {
            position: 'absolute',
            left: 3,

            transform: [{
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -40],
                })
            }],
            opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
            })
        };
        return (
            <View style={[{ height: 70, justifyContent: 'center' }, style]} >
                <Animated.View style={textStyle} >
                    <Text style={{ fontSize: 18, color: '#fff' }}>{label}</Text>
                </Animated.View>
                <TextInput
                    underlineColorAndroid='transparent'
                    // placeholder={isForcus ? '' : placeholder}
                    placeholderTextColor='#fff'
                    onChangeText={(textChange) => this.setState({ text: textChange })}
                    onFocus={() => this.setState({ isForcus: true })}
                    onBlur={() => this.setState({ isForcus: false })}
                    value={text}

                    style={[{
                        padding: 0,
                        paddingLeft: 3,
                        marginBottom: 0,
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 5,
                        color: '#fff',
                        height: 50,
                        width: width * 0.8,
                        fontSize: 18
                    }, textInputStyle]}
                    secureTextEntry={type !== undefined}
                />
            </View >
        );
    }
}

export { CustomTextInput };