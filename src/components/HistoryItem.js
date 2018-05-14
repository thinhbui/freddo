import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { COLOR } from '../ultils/constants/color';

const { width } = Dimensions.get('window');

const HistoryItem = ({ item, index, navigation }) => {
  const time = moment(item.billdate).format('DD-MM-YYYY HH:mm');
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        backgroundColor: index % 2 === 0 ? '#d8e7ff' : '#fff'
      }}
      onPress={() => navigation.navigate('Detail', { orderItem: item })}
    >
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 16 }}>{item.tableid}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>{time}</Text>
        </View>
      </View>
      <View>
        <Text>{item.username}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{}}>{item.amount}đ</Text>
      </View>
    </TouchableOpacity>
  );
};
export { HistoryItem };
