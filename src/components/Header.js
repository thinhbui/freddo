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
      height: Platform.OS === 'ios' ? 80 : 60,
      width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLOR.theme
    }}
  >
    {arrow && (
      <TouchableOpacity style={{ marginLeft: 15 }} onPress={onArrowPress}>
        <Icon name="ios-arrow-back-outline" size={35} color="#fff" />
      </TouchableOpacity>
    )}
    <StatusBar barStyle="light-content" />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
    </View>
  </View>
);

export { Header };
