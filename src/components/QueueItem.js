import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

class QueueItem extends PureComponent {
    state = {}
    render() {
        const { table, queue } = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <Text></Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: { width, height: 50 }
});
export { QueueItem };
