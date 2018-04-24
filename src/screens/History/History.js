import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Table, Header, HistoryItem } from '../../components';
import { data } from '../../ultils/constants/data';

const { height, width } = Dimensions.get('window');

export default class Historys extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-book' size={25} color='#fff' />
        ),
        header: null,
    };
    renderItem = ({ item }) => {
        const date = new Date();
        return (
            // <View>
            <HistoryItem table={item} time={date.toDateString()} />
            // </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <Header title='Lịch sử thanh toán' />
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
