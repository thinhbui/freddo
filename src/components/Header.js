import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR } from '../ultils/constants/color';


const { width } = Dimensions.get('window');

const Header = ({ title, arrow, onArrowPress }) => (
    <View
        style={{
            paddingTop: Platform.OS === 'ios' ? 20 : 0,
            height: Platform.OS === 'ios' ? 70 : 50,
            width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLOR.theme
        }}
    >
        {arrow && <TouchableOpacity style={{ marginLeft: 5 }} onPress={onArrowPress}>
            <Icon name='ios-arrow-back-outline' size={30} color='#fff' />
        </TouchableOpacity>}
        <StatusBar
            barStyle='light-content'
        />
        <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
    </View>
);


export { Header };
