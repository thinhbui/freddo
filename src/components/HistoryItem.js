import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { COLOR } from '../ultils/constants/color';

const { width } = Dimensions.get('window');
const HistoryItem = ({ item, index, navigation }) => {
  const time = moment(item.billdate).format('DD-MM-YYYY HH:mm');
  // const amount = `${item.amount.toLocaleString('vn-VI')}đ`;
  return (
    <TouchableOpacity
      style={{
        height: 70,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        backgroundColor: index % 2 === 0 ? '#d8e7ff' : '#fff'
      }}
      onPress={() => navigation.navigate('Detail', { orderItem: item })}
    >
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 16 }}>
          {item.table.name || item.tablename}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>{time}</Text>
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <Text>{item.user.name || item.user}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{}}>
          {item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export { HistoryItem };
