import React, { PureComponent } from 'react';
import {
    View,
    SectionList,
    Dimensions,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../ultils/constants/color';
import { NavigationActions } from 'react-navigation';
// import styles from './styles';
import { MenuItem, Header } from '../../components';
import { sectionListData } from '../../ultils/constants/data';

const { height, width } = Dimensions.get('window');

class Food extends PureComponent {
    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name='ios-restaurant' size={25} color='#fff' />
        ),
        header: null,
    };
    state = {
        textInput: '',
        data: []
    }
    componentWillMount() {
        this.setState({ data: sectionListData });
        // alert('Food');
    }

    onChangeText = (text) => {
        const arrFilter = [];
        const { data } = this.state;
        sectionListData.map((item, index) => {
            arrFilter[index] = {};
            arrFilter[index].data = item.data.filter((item1) => item1.name.includes(text));
            arrFilter[index].title = item.title;
        });
        this.setState({ text, data: arrFilter });
    }
    backToDetail = () => {
        this.props.navigation.dispatch(NavigationActions.pop());
    }
    renderItem = ({ item, index }) => (
        <MenuItem
            name={item.name}
            price={`${item.price}000`}
            img='http://bizweb.dktcdn.net/thumb/grande/100/229/171/products/cafe.jpg?v=1498729476127'
            onPress={() => console.log(index)}
        />
    )

    render() {
        const { data } = this.state;
        const { userId, orderId } = this.props.navigation.state.params;
        // console.log('menu', this.props.navigation.state.params.orderId);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={{ height: 50, width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.theme }}>
                    {orderId !== undefined &&
                        <TouchableOpacity onPress={this.backToDetail}>
                            <Icon name='ios-arrow-back-outline' size={30} color='#fff' />
                        </TouchableOpacity>
                    }
                    <View style={{ width: '80%', height: 30, borderColor: '#fff', borderWidth: 1, borderRadius: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, width: '100%', color: '#fff', height: 30, padding: 0, paddingLeft: 5, borderRadius: 5 }}
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
                    <SectionList
                        sections={data}
                        initialNumToRender={10}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        renderSectionHeader={({ section, index }) => (
                            <View key={index} style={{ backgroundColor: COLOR.light_theme, height: 30, justifyContent: 'center' }}>
                                <Text style={{ color: '#fff', paddingLeft: 5 }}>{section.title}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}
export default Food;
