import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const initialRouteName = "Splash";

const WindowStack = createStackNavigator({
    
}, {
        initialRouteName: initialRouteName,
        headerMode: 'none'
    });

export default createAppContainer(WindowStack);