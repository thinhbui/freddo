import React from 'react';
import { View, Text, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../ultils/constants/color';

const { width } = Dimensions.get('window');

const Table = ({ text, onPress, status, onLongPress, rootTable }) => (
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
    underlayColor="#8d9937"
    onLongPress={onLongPress}
  >
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: rootTable ? 0.5 : 1
      }}
    >
      <Text style={{ color: '#fff', fontSize: 16 }}>{text}</Text>
      <Icon name="ios-cafe-outline" size={50} color="#fff" />
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor:
            status === '0'
              ? COLOR.green
              : status === '1'
                ? COLOR.yellow
                : COLOR.red,
          position: 'absolute',
          top: 10,
          right: 10
        }}
      />
    </View>
  </TouchableHighlight>
);

export { Table };
