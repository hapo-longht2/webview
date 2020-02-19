import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../src/screens/homes';
import WebConnect from '../src/screens/webview';
import Like from '../src/screens/like';
import Google from '../src/screens/google';

const Tabs = createBottomTabNavigator({
  Home: {screen: Home},
  Google: {screen: Google},
  Like: {screen: Like},
});
const AppStack = createStackNavigator(
  {
    Home: {screen: Home},
    WebConnect: {screen: WebConnect},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppStack);

export default AppContainer;
