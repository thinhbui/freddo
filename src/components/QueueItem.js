import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { COLOR } from '../ultils/constants/color';

const { width } = Dimensions.get('window');

class QueueItem extends React.PureComponent {
  state = {
    open: false,
  }
  render() {
    const { item, index } = this.props;
    const time = moment().unix() - moment(item.billdate).unix();
    const time1 = moment(time1).format('HH:mm');
    console.log(item);

    return (
      <View>
        <TouchableOpacity
          style={{
            height: 50,
            width,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
            backgroundColor: index % 2 === 0 ? '#d8e7ff' : '#fff'
          }}
          onPress={() => this.setState({ open: !this.state.open })}
        >
          <View style={{ flex: 2 }}>
            <Text style={{ fontSize: 16 }}>{item.tableid}</Text>
            <Text>{time1}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{}}>
              {time1}
            </Text>
          </View>
        </TouchableOpacity>
        {/* {this.state.open &&
          // <FlatList

          // />
        } */}
      </View>
    );
  }
}
export { QueueItem };
