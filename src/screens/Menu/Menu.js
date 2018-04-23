import React, { PureComponent } from 'react';
import {
    View,
    // SectionList,
    // Dimensions,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    // Modal
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { MenuItem } from '../../components';
// import { sectionListData } from '../../ultils/constants/data';
import { getMenu } from '../../actions/MenuActions';
import { addOrderItem } from '../../actions/OrderActions';

// const { height, width } = Dimensions.get('window');
const background = require('../../ultils/images/cafe.png');

class Menu extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-restaurant' size={25} color='#fff' />
        ),
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            textInput: '',
            data: [],
            visible: false,
            menuId: '',
            itemSelected: {},
            quantity: 1,
        };
    }
    componentWillMount() {
        const { user, menus } = this.props;
        // console.log('menus', menus);

        if (menus.length === 0) {
            this.props.getMenu(user.id);
        } else {
            this.setState({ data: menus });
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.data.length === 0) this.setState({ data: newProps.menus });
    }
    onSubmit = () => {
        const { quantity, itemSelected } = this.state;
        const { order } = this.props;
        const filter = order.listItems.filter(item => item.code === itemSelected.code);
        if (filter.length === 0) itemSelected.quantity = quantity;
        else itemSelected.quantity = parseInt(filter[0].quantity, 10) + parseInt(quantity, 10);

        // console.log('itemSelected', itemSelected);
        this.setState({ visible: false });
        this.props.addOrderItem(itemSelected);
    }
    onChangeText = (text) => {
        const { menus } = this.props;
        const arrFilter = menus.filter((item) => item.code.includes(text.toUpperCase()));
        this.setState({ text, data: arrFilter });
    }

    onItemPress = (item) => {
        // console.log('item', item);
        this.setState({
            visible: true,
            itemSelected: item
        });
    }
    backToDetail = () => {
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
    }
    renderItem = ({ item }) => (
        <MenuItem
            name={item.name}
            price={item.price}
            img='http://bizweb.dktcdn.net/thumb/grande/100/229/171/products/cafe.jpg?v=1498729476127'
            onPress={() => this.onItemPress(item)}
        />
    );


    render() {
        const { data, visible } = this.state;
        const { orderId } = this.props.navigation.state.params;
        // console.log('data', this.props.order);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={styles.arrowLayout}>
                    {orderId !== undefined &&
                        <TouchableOpacity style={{ marginLeft: 5 }} onPress={this.backToDetail}>
                            <Icon name='ios-arrow-back-outline' size={30} color='#fff' />
                        </TouchableOpacity>
                    }
                    <View style={[styles.textLayout]}>
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid='transparent'
                            placeholder='Tìm kiếm'
                            placeholderTextColor='#fff'
                            onChangeText={this.onChangeText}
                        />
                        <TouchableOpacity style={{ marginRight: 5 }}>
                            <Icon name='ios-search' color='#fff' size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        source={background}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />
                    {/* <SectionList
                        sections={data}
                        initialNumToRender={10}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        renderSectionHeader={({ section, index }) => (
                            <View key={index} 
                            style={{ backgroundColor: COLOR.light_theme, h
                                eight: 30, justifyContent: 'center' }}>
                                <Text style={{ c
                                    olor: '#fff', paddingLeft: 5 }}>{section.title}</Text>
                            </View>
                        )}
                    /> */}
                    {
                        data.length === 0 ?
                            <ActivityIndicator
                                size='large'
                                color='#fff'
                            />
                            :
                            <FlatList
                                data={data}
                                keyExtractor={item => item.code}
                                renderItem={this.renderItem}
                            />
                    }
                </View>

                {visible &&
                    <TouchableOpacity
                        onPress={() => this.setState({ visible: false })}
                        style={styles.modal_layout}
                    >
                        <View style={styles.quantity_layout}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Số lượng</Text>
                                <TextInput
                                    style={{ width: 80 }}
                                    defaultValue={'1'}
                                    onChangeText={text => this.setState({ quantity: text })}
                                    autoFocus
                                />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={this.onSubmit}
                                    style={styles.button}
                                >
                                    <Text>Xác nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ visible: false })}
                                    style={styles.button}
                                >
                                    <Text>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getMenu: (id) => { dispatch(getMenu(id)); },
    addOrderItem: (item) => { dispatch(addOrderItem(item)); }
});

const mapStateToProps = (state) => {
    return {
        menus: state.MenuReducer,
        user: state.LoginReducer,
        order: state.OrderReducer,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
