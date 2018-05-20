import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
// import { data, dataSplice } from '../ultils/constants/data';

const { width } = Dimensions.get('window');
/*eslint-disable*/
class BillItem extends PureComponent {
  constructor(props) {
    super(props);
    this.swipeable = null;
    this.state = {
      quantity: 1,
      deleteKey: -1,
      amount: 0
    };
  }
  componentDidMount() {
    this.setState({ quantity: this.props.item.quantity });
  }
  formatNumber = x => `${x.toLocaleString('vn-VI')}đ`;
  onPressUp = () => {
    const { item } = this.props;
    const { quantity } = this.state;
    this.setState({ quantity: parseInt(quantity, 10) + 1 });
    item.quantity = quantity + 1;
    // this.props.changeQuantity(item);
    this.props.onChangeQuantity(item);
    // this.props.calAmount();
  };
  onPressDown = () => {
    const { quantity } = this.state;
    const { item } = this.props;
    if (quantity > 1) {
      this.setState({ quantity: parseInt(quantity, 10) - 1 });
      item.quantity = quantity - 1;
    }
    // this.props.changeQuantity(item);
    this.props.onChangeQuantity(item);

    // this.props.calAmount();
  };

  delete = () => {
    const { index, onSwipeRight } = this.props;
    Alert.alert(
      'Thông báo',
      'Bạn có muốn xóa không?',
      [
        {
          text: 'OK',
          onPress: () => {
            //data.splice(index, 1);
            this.handleUserBeganScrollingParentView();
            onSwipeRight(index);
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };
  handleUserBeganScrollingParentView = () => {
    this.swipeable.recenter();
  };

  render() {
    const { item, canChange } = this.props;
    const { quantity } = this.state;
    return (
      <Swipeable
        onRef={ref => (this.swipeable = ref)}
        rightButtons={[
          <TouchableOpacity
            onPress={this.delete}
            style={{
              flex: 1,
              paddingLeft: 20,
              justifyContent: 'center',
              backgroundColor: 'red'
            }}
          >
            <Icon name="ios-trash" color="#fff" size={30} />
          </TouchableOpacity>
        ]}
        rightButtonWidth={60}
        onRightActionRelease={this.delete}
        rightActionActivationDistance={width / 2}
      >
        <View
          style={{
            width,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>
              {this.formatNumber(item.price)}
            </Text>
          </View>
          <View
            style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              {canChange ? (
                <TextInput
                  style={{
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: 'gray',
                    minWidth: 30,
                    height: 50
                  }}
                  onChangeText={text => {
                    const { item } = this.props;
                    this.setState({ quantity: text });
                    item.quantity = text;
                    this.props.onChangeQuantity(item);
                  }}
                  value={item.quantity.toString()}
                />
              ) : (
                <View
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                </View>
              )}
              {canChange && (
                <View style={{ alignItems: 'center', marginLeft: 5 }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 25
                    }}
                    onPress={this.onPressUp}
                  >
                    <Icon
                      name={
                        Platform.OS === 'ios'
                          ? 'ios-add-outline'
                          : 'md-arrow-dropup'
                      }
                      size={Platform.OS === 'ios' ? 35 : 70}
                      color="green"
                      style={{ alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      height: 25
                    }}
                    onPress={this.onPressDown}
                  >
                    <Icon
                      name={
                        Platform.OS === 'ios'
                          ? 'ios-remove-outline'
                          : 'md-arrow-dropdown'
                      }
                      size={Platform.OS === 'ios' ? 35 : 70}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </Swipeable>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  // changeQuantity: (item) => dispatch(changeQuantity(item))
});
const mapStateToProps = state => ({});
export default connect(mapStateToProps, mapDispatchToProps)(BillItem);
