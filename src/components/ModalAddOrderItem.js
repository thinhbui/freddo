import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableHighlight,
    Image,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const ModalAddOrderItem = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType='slide'
        >
            
        </Modal>
    );
};

export { ModalAddOrderItem };
