import React, { PureComponent } from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Alert
} from 'react-native';
// import { NavigationActions } from 'react-navigation';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
// import { data, dataSplice } from '../ultils/constants/data';

const { width } = Dimensions.get('window');
/*eslint-disable*/
class BillItem extends PureComponent {
	constructor(props) {
		super(props);
		this.swipeable = null;
		this.state = {
			quantity: 1,
			deleteKey: -1,
			amount: 0,
		};
	}
	componentDidMount() {
		this.setState({ quantity: this.props.quantity });
	}
	onPressUp = () => {
		const { quantity } = this.state;
		this.setState({ quantity: parseInt(quantity, 10) + 1 });
	}
	onPressDown = () => {
		const { quantity } = this.state;
		if (quantity > 1) {
			this.setState({ quantity: parseInt(quantity, 10) - 1 });
		}
	}

	delete = () => {
		const { index, onSwipeRight } = this.props;
		Alert.alert(
			'Thông báo',
			'Bạn có muốn xóa không?',
			[
				{
					text: 'OK',
					onPress: () => {
						//data.splice(index, 1);
						this.handleUserBeganScrollingParentView();
						onSwipeRight(index);
					}
				},
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
			],
			{ cancelable: true });
	}
	handleUserBeganScrollingParentView = () => {
		this.swipeable.recenter();
	}

	render() {
		const { name, price } = this.props;
		const { quantity } = this.state;
		return (
			<Swipeable
				onRef={ref => this.swipeable = ref}
				rightButtons={[
					<TouchableOpacity
						onPress={this.delete}
						style={{ flex: 1, paddingLeft: 20, justifyContent: 'center', backgroundColor: 'red' }}
					>
						<Icon name='ios-trash' color='#fff' size={30} />
					</TouchableOpacity>
				]}
				rightButtonWidth={60}
				onRightActionRelease={this.delete}
				rightActionActivationDistance={width / 3}
			>
				<View style={{ width, height: 50, flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ flex: 2, alignItems: 'center' }}>
						<Text style={{ fontSize: 18 }}>{name}</Text>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
							<TextInput
								style={{ fontSize: 18, borderWidth: 1, borderColor: 'gray', width: 30 }}
								onChangeText={(text) => this.setState({ quantity: text })}
								value={quantity.toString()}
							/>
							<View style={{ alignItems: 'center', flexDirection: 'column', marginLeft: 5 }}>
								<TouchableOpacity
									style={{
										height: 16,
										justifyContent: 'center'
									}}
									onPress={this.onPressUp}
								>
									<Icon name='md-arrow-dropup' size={50} color='green' />
								</TouchableOpacity>
								<View style={{ height: 2 }} />
								<TouchableOpacity
									style={{
										height: 18,
										justifyContent: 'center'
									}}
									onPress={this.onPressDown}
								>

									<Icon name='md-arrow-dropdown' size={50} color='red' />
								</TouchableOpacity>
							</View>
						</View>

					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text style={{ fontSize: 18 }}>{price}</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text style={{ fontSize: 18 }}>{price * quantity}</Text>
					</View>
				</View>
			</Swipeable>
		);
	}
}
export { BillItem };
