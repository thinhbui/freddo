import React, { PureComponent, Component } from 'react';
import {
    View,
    FlatList,
    Image
    // Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
import { Table, Header } from '../../components';

// const { height, width } = Dimensions.get('window');

export default class Home extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-home-outline' size={25} color='#fff' />
        ),
        header: null,
    };
    renderItem = ({ item }) => {
        return (
            <Table text={item} onPress={() => console.log('a')} isEmpty />
        );
    }
    render() {
        console.log('Home render');
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <Header title='Danh sách bàn' />
                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../../ultils/images/cafe.png')}
                        style={{ position: 'absolute', width: '100%', height: '100%' }} />
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        numColumns={3}
                    />
                </View>
            </View>
        );
    }
}
