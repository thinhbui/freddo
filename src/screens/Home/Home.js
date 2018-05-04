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
// import io from 'socket.io-client/dist/socket.io.js';
import { connect } from 'react-redux';
// import styles from './styles';
import { Table, Header } from '../../components';
// import { COLOR } from '../../ultils/constants/color';
import styles from './styles';
import { getTable, updateTable, resetOrder } from '../../actions';
import Images from '../../ultils/constants/Images';

// const { height, width } = Dimensions.get('window');

class Home extends PureComponent {
	static navigationOptions = {
		tabBarIcon: () => (
			<Icon name='ios-home' size={25} color='#fff' />
		),
		header: null,
	};
	constructor(props) {
		super(props);
		// this.socket = io('http://192.168.38.1:3000', { jsonp: false });
		this.state = {
			sortById: true,
			sortByState: true,
			tables: [],
			refresh: false,
		};
	}

	componentWillMount() {
		console.log('WillMount Home');
		this.props.getTable();
		this.props.resetOrder();
	}

	componentDidMount() {
		const { tables } = this.props;
		if (tables.length === 0) this.props.getTable();
		this.setState({ tables });
	}
	componentWillReceiveProps(newProps) {
		if (newProps.tables.length > 0) this.setState({ tables: newProps.tables });
	}
	componentDidUpdate(props, nextprops) {
		// console.log(props, nextprops);
		// this.setTables(nextprops.tables);
	}
	onPressTable = (table) => {
		this.props.navigation.navigate('Detail',
			{ table, refresh: this.refresh }
		);
	}

	onPressState = () => this.setState({ sortByState: !this.state.sortByState });
	onPressId = () => this.setState({ sortById: !this.state.sortById });
	setTables = (tables) => this.setState({ tables });

	refresh = () => {
		console.log('refresh home');

		this.setState({ refresh: !this.state.refresh });
	}
	renderItem = ({ item }) => (
		<Table
			text={item.name}
			onPress={() => this.onPressTable(item)}
			status={item.status}
		/>
	);
	render() {
		const { sortById, sortByState, tables } = this.state;
		console.log(tables);
		// console.log('this.props.tables', this.props.tables);

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
								extraData={this.state}
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
	getTable: () => { dispatch(getTable()); },
	updateTable: (table) => { dispatch(updateTable(table)); },
	resetOrder: () => dispatch(resetOrder()),

});

const mapStateToProps = (state) => ({
	tables: state.TableReducer,

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
