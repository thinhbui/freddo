import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    // Image,
    Modal,
    TextInput
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// 
// const { width, height } = Dimensions.get('window');

class ModalAddOrderItem extends PureComponent {
    state = {
        text: '1'
    }
    render() {
        const { visible, onClose, onDismiss, onExit } = this.props;
        const { text } = this.state;
        return (
            <Modal
                visible={visible}
                onRequestClose={onClose}
                // animationType='slide'
                onDismiss={onDismiss}
                transparent
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: 'gray' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Số lượng</Text>
                            <TextInput
                                style={{ width: 80 }}
                                defaultValue={'1'}
                                autoFocus
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={this.props.onSubmit(text)}
                                style={{ width: 100, height: 40, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Xác nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onExit}
                                style={{ width: 100, height: 40, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export { ModalAddOrderItem };
