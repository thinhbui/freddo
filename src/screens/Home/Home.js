import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    // Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import styles from './styles';
import { Table, Header } from '../../components';
import { COLOR } from '../../ultils/constants/color';
import styles from './styles';

// const { height, width } = Dimensions.get('window');

export default class Home extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-home' size={25} color='#fff' />
        ),
        header: null,
    };
    state = {
        sortById: true,
        sortByState: true,
    }
    onPressTable = (orderId) => {
        this.props.navigation.navigate('Detail', { orderId });
    }

    onPressState = () => this.setState({ sortByState: !this.state.sortByState });

    onPressId = () => this.setState({ sortById: !this.state.sortById });

    renderItem = ({ item }) => {
        console.log();
        return (
            <Table text={item} onPress={() => this.onPressTable(item)} isEmpty />
        );
    }
    render() {
        const { sortById, sortByState } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <Header title='Danh sách bàn' />
                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../../ultils/images/cafe.png')}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />
                    <View style={styles.change_sort_bar}>
                        <Text style={{ color: '#fff', marginLeft: 10 }}>Sắp xếp</Text>
                        <TouchableOpacity
                            onPress={this.onPressId}
                            style={styles.change_sort_item}
                        >
                            <Text style={{ color: '#fff', marginRight: 5 }}>Thứ tự</Text>
                            <Icon name={sortById ? 'md-arrow-dropdown' : 'md-arrow-dropup'} size={30} color='#fff' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onPressState}
                            style={styles.change_sort_item}
                        >
                            <Text style={{ color: '#fff', marginRight: 5 }}>Trạng thái</Text>
                            <Icon name={sortByState ? 'md-arrow-dropdown' : 'md-arrow-dropup'} size={30} color='#fff' />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        numColumns={3}
                    />
                </View>
            </View>
        );
    }
}
