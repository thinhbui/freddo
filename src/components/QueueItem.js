import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
// import { COLOR } from '../ultils/constants/color';

const { width } = Dimensions.get('window');

class QueueItem extends React.PureComponent {
  state = {
    open: false,
    count: 0,
    maxTime: '',
    data: []
  };
  componentDidMount() {
    const { item } = this.props;
    let count = 0;
    let max = 0;
    let data = [];
    item.listItems.forEach(element => {
      if (!element.status) {
        count++;
        const time = moment().unix() - moment(element.created * 1000).unix();
        console.log(moment(time).format('HH:mm'));

        if (time > max) {
          max = time;
        }
        data = [...data, { ...element, rangeTime: time }];
      }
    });
    this.setState({ count, maxTime: moment(max).format('HH:mm'), data });
  }
  renderItem = ({ item }) => {
    const { index } = this.props;
    return (
      <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15 }}>
        <View
          style={{
            flex: 2,
            paddingLeft: 15,
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: index % 2 === 0 ? 'black' : '#fff' }}>
            {item.name}
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: index % 2 === 0 ? 'black' : '#fff' }}>
            {moment(item.rangeTime).format('HH:mm')}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { item, index } = this.props;
    const { count, maxTime, open, data } = this.state;

    console.log(item);

    return (
      <View
        style={{ backgroundColor: index % 2 === 0 ? '#d8e7ff' : 'steelblue' }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width,
            alignItems: 'center',
            paddingLeft: 15
          }}
          onPress={() => this.setState({ open: !this.state.open })}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 16,
                  color: index % 2 === 0 ? 'black' : '#fff'
                }}
              >
                {item.tableid}
              </Text>
              <Text style={{ color: index % 2 === 0 ? 'black' : '#fff' }}>
                {count} món
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: index % 2 === 0 ? 'black' : '#fff' }}>
                {maxTime}
              </Text>
            </View>
            <View style={{ paddingRight: 15, justifyContent: 'center' }}>
              <Icon
                name={open ? 'ios-arrow-down' : 'ios-arrow-forward'}
                size={30}
                color={index % 2 === 0 ? 'black' : '#fff'}
              />
            </View>
          </View>
        </TouchableOpacity>
        {open && (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={key => key.id}
          />
        )}
      </View>
    );
  }
}
export { QueueItem };
