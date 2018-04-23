import React, { PureComponent } from 'react';
import {
    View,
    SectionList,
    Dimensions,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { MenuItem } from '../../components';
// import { sectionListData } from '../../ultils/constants/data';
import { getMenu } from '../../actions/MenuActions';


// const { height, width } = Dimensions.get('window');

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
            menuId: ''
        };
    }
    componentWillMount() {
        const { user, menus } = this.props;
        console.log('menus', menus);

        if (menus.length === 0) {
            this.props.getMenu(user.id);
        } else {
            this.setState({ data: menus });
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('newProps', newProps.menus);
        this.setState({ data: [...newProps.menus] });
    }
    onSubmit(text) {
        this.setState({ visible: false });
    }
    onChangeText = (text) => {
        const { menus } = this.props;

        const arrFilter = menus.filter((item) => item.code.includes(text.toUpperCase()));
        this.setState({ text, data: arrFilter });
    }
    backToDetail = () => {
        this.props.navigation.dispatch(NavigationActions.pop());
    }
    renderItem = ({ item }) => (
        <MenuItem
            name={item.name}
            price={item.price}
            img='http://bizweb.dktcdn.net/thumb/grande/100/229/171/products/cafe.jpg?v=1498729476127'
            onPress={() => this.setState({ visible: true })}
        />
    );


    render() {
        const { data, visible } = this.state;
        const { orderId } = this.props.navigation.state.params;
        console.log('data', orderId);
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
                        source={require('../../ultils/images/cafe.png')}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />
                    {/* <SectionList
                        sections={data}
                        initialNumToRender={10}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        renderSectionHeader={({ section, index }) => (
                            <View key={index} style={{ backgroundColor: COLOR.light_theme, height: 30, justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', paddingLeft: 5 }}>{section.title}</Text>
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

                <Modal
                    visible={visible}
                    onRequestClose={() => this.setState({ visible: false })}
                    onDismiss={() => this.setState({ visible: false })}
                    transparent
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: 'gray' }}>
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
                                    onPress={() => this.setState({ visible: false })}
                                    style={{ width: 100, height: 40, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Xác nhận</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ visible: false })}
                                    style={{ width: 100, height: 40, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getMenu: (id) => { dispatch(getMenu(id)); }
});

const mapStateToProps = (state) =>
    // console.log('menu', state);
    ({
        menus: state.MenuReducer,
        user: state.LoginReducer
    });

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
