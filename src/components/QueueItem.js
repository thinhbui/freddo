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
    item.listitems.forEach(element => {
      if (!element.status) {
        count++;
        const time = moment().unix() - moment.utc(element.createAt).unix();
        if (item.table.name === 'Bàn 1') {
          console.log(moment().unix());
          console.log(moment.utc(element.createAt).unix());
          console.log(element.createAt);
        }
        if (time > max) {
          max = time;
        }
        data = [...data, { ...element, rangeTime: time }];
      }
    });
    this.setState({
      count,
      maxTime: moment.utc(max * 1000).format('HH:mm'),
      data
    });
  }
  renderItem = ({ item }) => {
    const { index } = this.props;

    return (
      <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15 }}>
        <View
          style={{
            flex: 2,
            padding: 15,
            justifyContent: 'center',
            borderTopColor: index % 2 === 0 ? 'black' : '#fff',
            borderTopWidth: 0.5
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
            {moment.utc(item.rangeTime * 1000).format('HH:mm')}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { item, index } = this.props;
    const { count, maxTime, open, data } = this.state;

    // console.log(item);

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
                {item.table.name || item.tablename}
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
            keyExtractor={key => key._id}
          />
        )}
      </View>
    );
  }
}
export { QueueItem };
