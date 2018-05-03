import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
import { Header, QueueItem } from '../../components';
import { QueueData } from '../../ultils/constants/data';


export default class Queue extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-clock' size={25} color='#fff' />
        ),
        header: null,
    };
    renderItem = ({ item, index }) => {
        // console.log(index);
        return (
            <QueueItem item={item} index={index} />
        );
    }
    render() {
        console.log('Drink render');
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <Header title='Hàng đợi' />
                <FlatList
                    data={QueueData}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}
