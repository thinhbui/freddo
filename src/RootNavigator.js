import { StackNavigator, TabNavigator } from 'react-navigation';
import Detail from './screens/Detail/Detail';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home';
import Menu from './screens/Menu/Menu';
import Queue from './screens/Queue/Queue';
import HistoryScreen from './screens/History/History';
import { COLOR } from './ultils/constants/color';

const MainNavigator = TabNavigator(
  {
    Home: { screen: Home },
    Menu: { screen: Menu },
    Queue: { screen: Queue },
    History: { screen: HistoryScreen }
  },
  {
    headerMode: 'none',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: COLOR.theme
      },
      indicatorStyle: { backgroundColor: COLOR.theme }
    }
  }
);

const RootNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: MainNavigator },
    Detail: {
      screen: Detail,
      path: 'Detail/:orderId'
    },
    MenuOrder: {
      screen: Menu,
      path: 'MenuOrder/:orderId'
    }
  },
  {
    // initialRouteName: 'Main',
    headerMode: 'none'
  }
);
export default RootNavigator;
