import React, { PureComponent } from 'react';
import {
	View,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	ActivityIndicator
	// Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import styles from './styles';
import { Table, Header } from '../../components';
// import { COLOR } from '../../ultils/constants/color';
import styles from './styles';
import { getTable } from '../../actions';
import Images from '../../ultils/constants/Images';

// const { height, width } = Dimensions.get('window');

class Home extends PureComponent {
	static navigationOptions = {
		tabBarIcon: () => (
			<Icon name='ios-home' size={25} color='#fff' />
		),
		header: null,
	};
	state = {
		sortById: true,
		sortByState: true,
		tables: []
	}
	componentWillMount() {
		const { tables } = this.props;
		this.props.getTable();
		// if (tables.length !== 0) {
		this.setState({ tables });
		// }
	}
	componentWillReceiveProps(newProps) {
		this.setState({ tables: newProps.tables });
	}
	onPressTable = (orderId) => {
		this.props.navigation.navigate('Detail', { orderId });
	}
	onPressState = () => this.setState({ sortByState: !this.state.sortByState });
	onPressId = () => this.setState({ sortById: !this.state.sortById });

	renderItem = ({ item }) => (
		<Table
			text={item.name}
			onPress={() => this.onPressTable(item.orderid)}
			status={item.status}
		/>
	);
	render() {
		const { sortById, sortByState, tables } = this.state;
		// console.log(tables);
		return (
			<View style={{ flex: 1, backgroundColor: '#fff', }}>

				<Header title='Danh sách bàn' />
				<View style={{ flex: 1 }}>
					<Image
						source={Images.background}
						style={{ position: 'absolute', width: '100%', height: '100%' }}
					/>
					<View style={styles.change_sort_bar}>
						<Text style={{ color: '#fff', marginLeft: 10 }}>Sắp xếp</Text>
						<TouchableOpacity
							onPress={this.onPressId}
							style={styles.change_sort_item}
						>
							<Text style={{ color: '#fff', marginRight: 5 }}>Thứ tự</Text>
							<Icon
								name={sortById ? 'md-arrow-dropdown' : 'md-arrow-dropup'}
								size={30}
								color='#fff'
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.onPressState}
							style={styles.change_sort_item}
						>
							<Text style={{ color: '#fff', marginRight: 5 }}>Trạng thái</Text>
							<Icon
								name={sortByState ? 'md-arrow-dropdown' : 'md-arrow-dropup'}
								size={30}
								color='#fff'
							/>
						</TouchableOpacity>
					</View>
					{
						tables.length === 0 ?
							<ActivityIndicator
								size='large'
								color='#fff'
							/>
							:
							<FlatList
								data={tables}
								keyExtractor={(item) => item.id}
								renderItem={this.renderItem}
								numColumns={3}
							/>
					}

				</View>
			</View>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	getTable: () => { dispatch(getTable()); }
});

const mapStateToProps = (state) => ({
	tables: state.TableReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
