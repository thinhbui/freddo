import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const MenuItem = ({ name, price, onPress, img }) => (
    <TouchableOpacity
        style={{
            width,
            height: height * 0.13,
            backgroundColor: '#fff',
            paddingLeft: 10,

        }}
        activeOpacity={1}
        onPress={onPress}
        underlayColor='#8d9937'
    >

        <View
            style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                width
            }}
        >
            <View style={{ width: height * 0.11, alignItems: 'center' }}>
                <Image
                    source={{ uri: img }}
                    style={{ width: height * 0.1, height: height * 0.1, borderRadius: height * 0.05 }}
                />
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text>{name}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text>{price}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


export { MenuItem };
