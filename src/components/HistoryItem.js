import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../ultils/constants/color';

const { width, height } = Dimensions.get('window');

const HistoryItem = ({ table, time }) => {
    return (
        <TouchableOpacity style={{ height: 50, width, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>{table}</Text>
            <Text>{time}</Text>
        </TouchableOpacity>
    );
};

export { HistoryItem };
