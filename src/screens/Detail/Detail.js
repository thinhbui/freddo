import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';
import { BillItem, Header } from '../../components';
import styles from './styles';
import { getOrder, addNewOrder, deleteItemOrder, postOrder, resetOrder, updateTable }
    from '../../actions';

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
        // console.log('componentDidMount');
        console.log('componentWillReceiveProps', this.props.order);
        this.setData();
        BackHandler.addEventListener('backHome', this.backHandler);
    }
    componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps', newProps.order.listItems);

        this.setState({ data: newProps.order.listItems });
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
        this.setData();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('backHome', this.backHandler);
        console.log('componentDidUpdate');
    }

    onSwipeRight(index) {
        this.setState({ deleteKey: index });
        this.props.deleteItemOrder(index);
    }

    onSavePress = () => {
        const { order } = this.props;
        const { orderId } = this.props.navigation.state.params;
        order.billdate = moment.unix();
        if (order.listItems.length > 0 && orderId === '') {
            this.props.postOrder(order);
        }
        if (orderId !== '') {
            if (order.listItems.length === 0) this.props.deleteOrder();
            else this.props.updateOrder(order);
        }
        this.props.resetOrder();
        this.props.navigation.goBack();
    }
    onOutPress = () => {
        const { order } = this.props;
        const { table } = this.props.navigation.state.params;
        order.status = true;
        this.props.updateOrder(order);
        table.state = false;
        this.props.updateTable(table);
        // this.props.updateTable(); 
        // if (order !== {}) {
        //     console.log(order);
        // } else {
        //     ///
        // }
    }
    setData = () => {
        const { order } = this.props;
        this.setState({ data: order.listItems });
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
            { orderId: '', username: '', refresh: this.refresh, detail: true });
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
        );
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
        // const { orderId } = this.props.navigation.state.params;
        const { data } = this.state;
        console.log(data);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    title='Chi tiết bàn'
                    arrow
                    onArrowPress={() => this.props.navigation.goBack()}
                />
                {this.renderColumn()}
                <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
                    <TouchableOpacity
                        style={styles.add_button}
                        onPress={this.navigationToMenu}
                    >
                        <Text style={{ color: '#fff' }}> Thêm đồ </Text>
                    </TouchableOpacity>
                </View>
                {
                    data.length > 0 &&
                    <FlatList
                        data={data}
                        extraData={this.state}
                        keyExtractor={(item) => item.code}
                        renderItem={this.renderItem}
                    />
                }
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
    addNewOrder: (order) => dispatch(addNewOrder(order)),
    deleteItemOrder: index => dispatch(deleteItemOrder(index)),
    postOrder: order => dispatch(postOrder(order)),
    resetOrder: () => dispatch(resetOrder()),
    updateTable: (table) => dispatch(updateTable(table))
});
const mapStateToProps = (state) =>
    ({
        order: state.OrderReducer
    });
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
