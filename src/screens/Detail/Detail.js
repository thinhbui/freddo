import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    // Dimensions,
    Text,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
// import styles from './styles';
import { BillItem, Header } from '../../components';
// import { data } from '../../ultils/constants/data';
// import { COLOR } from '../../ultils/constants/color';
import styles from './styles';
import { getOrder, addNewOrder } from '../../actions';

// const { width } = Dimensions.get('window');

class Detail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            deleteKey: -1,
            orderState: {},
            data: [],
            refresh: true,
        };
    }
    componentWillMount() {
        const { orderId } = this.props.navigation.state.params;
        if (orderId) this.props.getOrder(orderId);
    }
    componentDidMount() {
        console.log('componentDidMount');
        BackHandler.addEventListener('backHome', this.backHandler);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        const { order } = this.props;
        this.setState({ data: order.listItems });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('backHome', this.backHandler);
        console.log('componentDidUpdate');

    }
    onSwipeRight(index) {
        this.setState({ deleteKey: index });
    }

    onSavePress = () => {
        const { order } = this.props;
        if (order !== {}) {
            console.log(order);
        } else {
            // order();
        }
    }
    onOutPress = () => {
        const { order } = this.props;
        if (order !== {}) {
            console.log(order);
        } else {
        }
    }
    backHandler = () => {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }
    refresh = () => {
        console.log('refresh');

        this.setState({ refresh: !this.refresh });
    }
    navigationToMenu = () => {
        BackHandler.removeEventListener('backHome', this.backHandler);
        this.props.navigation.navigate('MenuOrder',
            { orderId: '', username: '', refresh: this.refresh });
    }
    renderItem = ({ item, index }) => {
        console.log(item);
        return (
            <BillItem
                name={item.name}
                price={20}
                quantity={item.quantity}
                index={index}
                onSwipeRight={() => this.onSwipeRight(index)}
            />
        )
    }
    renderColumn = () => (
        <View style={styles.header_column}>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <Text style={{}}>Tên</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{}}>Số lượng</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{}}>Đơn giá</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{}}>Thành tiền</Text>
            </View>
        </View>
    )
    render() {
        const { orderId } = this.props.navigation.state.params;
        const { data } = this.state;
        console.log(data);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title='Chi tiết bàn' />
                {this.renderColumn()}
                <TouchableOpacity
                    style={styles.add_button}
                    onPress={this.navigationToMenu}
                >
                    <Text style={{ color: '#fff' }}> Thêm đồ </Text>
                </TouchableOpacity>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.code}
                    renderItem={this.renderItem}
                />
                <View style={styles.button}>
                    <TouchableOpacity style={styles.save_button} onPress={this.onSavePress} >
                        <Text style={{ color: '#fff' }}>Lưu</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '100%', backgroundColor: '#fff' }} />
                    <TouchableOpacity style={styles.save_button} onPress={this.onOutPress}>
                        <Text style={{ color: '#fff' }}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getOrder: (id) => dispatch(getOrder(id)),
    addNewOrder: (order) => dispatch(addNewOrder(order))
});
const mapStateToProps = (state) =>
    ({
        order: state.OrderReducer
    });
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
