import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../ultils/constants/color';

const { width, height } = Dimensions.get('window');

const HistoryItem = ({ item, onPress }) => {
  const time = moment(item.billdate).unix();
  return (
    <TouchableOpacity
      style={{ height: 50, width, flexDirection: 'row', alignItems: 'center' }}
      onPress={onPress}
    >
      <View>
        <Text style={{ fontSize: 16 }}>{item.tableid}</Text>
        <Text>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { HistoryItem };
