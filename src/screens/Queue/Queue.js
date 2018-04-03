import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Header, QueueItem } from '../../components';

const { height, width } = Dimensions.get('window');

const queueData = [
    1, 2, 3, 4
];
export default class Queue extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-clock' size={25} color='#fff' />
        ),
        header: null,
    };
    renderItem = ({ item, index }) => {
        console.log(index);
        return (
            <QueueItem table={item} queue={[]} />
        );
    }
    render() {
        console.log('Drink render');
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <Header title='Hàng đợi' />
                <FlatList
                    data={queueData}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
