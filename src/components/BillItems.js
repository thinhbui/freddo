import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import { data, dataSplice } from '../ultils/constants/data';

const { width, height } = Dimensions.get('window');

class BillItem extends PureComponent {
    constructor(props) {
        super(props);
        this.swipeable = null;
        this.state = {
            amount: 1,
            deleteKey: -1
        };
    }
  
    onPressUp = () => {
        const { amount } = this.state;
        this.setState({ amount: parseInt(amount, 10) + 1 });
    }
    onPressDown = () => {
        const { amount } = this.state;
        if (amount > 1) {
            this.setState({ amount: parseInt(amount, 10) - 1 });
        }
    }
  
    delete = () => {
        const { index, onSwipeRight } = this.props;
        Alert.alert(
            'Thông báo',
            'Bạn có muốn xóa không?',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        data.splice(index, 1);
                        onSwipeRight(index);
                        this.handleUserBeganScrollingParentView();
                    }
                },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: true });
    }
    handleUserBeganScrollingParentView = () => {
        this.swipeable.recenter();
    }

    render() {
        const { name, price, index } = this.props;
        const { amount } = this.state;
        return (
            <Swipeable
                onRef={ref => this.swipeable = ref}
                rightButtons={[
                    <TouchableOpacity
                        // onPress={this.delete}
                        onPress={this.delete}
                        style={{ flex: 1, paddingLeft: 20, justifyContent: 'center', backgroundColor: 'red' }}
                    >
                        <Icon name='ios-trash' color='#fff' size={30} />
                    </TouchableOpacity>
                ]}
                rightButtonWidth={60}
                onRightActionRelease={this.delete}
                rightActionActivationDistance={width / 3}
            >
                <View style={{ width, height: 50, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{name + index}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <TextInput
                                style={{ fontSize: 18, borderWidth: 1, borderColor: 'gray' }}
                                onChangeText={(text) => this.setState({ amount: text })}
                                value={amount.toString()}

                            />
                            {/* {amount} */}
                            <View style={{ alignItems: 'center', flexDirection: 'column', marginLeft: 5 }}>
                                <TouchableOpacity
                                    style={{
                                        height: 16,
                                        justifyContent: 'center'
                                    }}
                                    onPress={this.onPressUp}
                                >
                                    <Icon name='md-arrow-dropup' size={50} color='green' style={{}} />
                                </TouchableOpacity>
                                <View style={{ height: 2 }} />
                                <TouchableOpacity
                                    style={{
                                        height: 18,
                                        justifyContent: 'center'
                                    }}
                                    onPress={this.onPressDown}
                                >

                                    <Icon name='md-arrow-dropdown' size={50} color='red' />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{price}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{price * amount}</Text>
                    </View>
                </View>
            </Swipeable>
        );
    }
}
export { BillItem };
