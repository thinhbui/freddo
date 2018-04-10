import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    // TouchableHighlight
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

import { COLOR } from '../ultils/constants/color';

const { width } = Dimensions.get('window');

const Header = ({ title }) => {
    console.log();
    return (
        <View style={{ height: 50, width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.theme }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
        </View>
    );
};

export { Header };
