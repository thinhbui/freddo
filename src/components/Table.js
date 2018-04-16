import React, { } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Table = ({ text, onPress, status }) => {
    console.log();
    return (
        <TouchableHighlight
            style={{
                width: width / 3,
                height: width / 3,
                backgroundColor: 'transparent',
                borderColor: '#fff',
                borderWidth: 1
            }}
            activeOpacity={1}
            onPress={onPress}
            underlayColor='#8d9937'
        >

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#fff', fontSize: 16 }}>{text}</Text>
                <Icon name="ios-cafe-outline" size={50} color='#fff' />
                <View
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: status ? '#ff3f00' : '#00ff1d',
                        position: 'absolute',
                        top: 10,
                        right: 10
                    }}
                />
            </View>
        </TouchableHighlight>
    );
};

export { Table };
