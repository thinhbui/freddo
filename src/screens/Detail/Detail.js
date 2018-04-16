import React, { PureComponent, Component } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    Text,
    TouchableOpacity,
    BackHandler,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { BillItem, Header } from '../../components';
import { data } from '../../ultils/constants/data';
import { COLOR } from '../../ultils/constants/color';

const { height, width } = Dimensions.get('window');

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteKey: -1
        };
    }
    componentWillMount() {
        const { orderId } = this.props.navigation.state.params;
    }
    componentDidMount() {
        BackHandler.addEventListener('backHome', this.backHandler);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('backHome', this.backHandler);
    }
    onSwipeRight(index) {
        console.log('onSwipeRight', index);
        this.setState({ deleteKey: index });
    }
    backHandler = () => {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }
    navigationToMenu = () => {
        const { orderId } = this.props.navigation.state.params;
        const navigate = NavigationActions.navigate({ routeName: 'MenuOrder', params: { orderId } });
        this.props.navigation.dispatch(navigate);
        BackHandler.removeEventListener('backHome', this.backHandler);
    }
    renderItem = ({ item, index }) =>
        <View>
            {
                index === 0 &&
                <TouchableOpacity style={{ width, justifyContent: 'center', alignItems: 'center' }} onPress={this.navigationToMenu}>
                    <Text style={{}}> Thêm đồ </Text>
                </TouchableOpacity>
            }
            <BillItem
                name='Cà phê đen'
                price={20}
                index={index}
                onSwipeRight={() => this.onSwipeRight(index)}
            />
        </View>

    renderColumn = () => (
        <View style={{ width, height: 25, flexDirection: 'row', backgroundColor: COLOR.light_theme }}>
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
        // const { deleteKey } = this.state;
        const { orderId } = this.props.navigation.state.params;
        // console.log('Detail', this.props);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title='Chi tiết bàn' />
                {this.renderColumn()}
                {orderId === '' ?
                    <TouchableOpacity style={{ height: 40, width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 20 }} onPress={this.navigationToMenu}>
                        <Text style={{ color: '#fff' }}> Thêm đồ </Text>
                    </TouchableOpacity>
                    : <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />}
                <View style={{ position: 'absolute', bottom: 0, left: 0, width, flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.theme }}>
                        <Text style={{ color: '#fff' }}>Lưu</Text>
                    </TouchableOpacity>
                    <View style={{ width: 1, height: '100%', backgroundColor: '#fff' }} />
                    <TouchableOpacity style={{ flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.theme }}>
                        <Text style={{ color: '#fff' }}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
