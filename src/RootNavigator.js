import { StackNavigator, TabNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
import Detail from './screens/Detail/Detail';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Food from './screens/Food/Food';
import Queue from './screens/Queue/Queue';
import Historys from './screens/History/History';

const MainNavigator = TabNavigator({
    Home: { screen: Home },
    Food: { screen: Food },
    Queue: { screen: Queue },
    History: { screen: Historys },
}, {
        headerMode: 'none',
        tabBarPosition: 'bottom',
        lazy: false,
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            style: {
                backgroundColor: 'brown',
            },
            indicatorStyle: { backgroundColor: 'brown' },
        }
    });

const RootNavigator = StackNavigator({
    Login: { screen: Login },
    Main: { screen: MainNavigator },
    Detail: {
        screen: Detail,
    }
},
    {
        // initialRouteName: 'Main',
        headerMode: 'none',

    }
);
export default RootNavigator;
