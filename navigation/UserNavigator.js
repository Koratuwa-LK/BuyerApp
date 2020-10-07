import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MarketScreen from "../screens/MarketScreen";
import FirstScreen from "../screens/firstscreen";

const UserNavigator = createStackNavigator({
  First: FirstScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Market: MarketScreen,
});

export default createAppContainer(UserNavigator);
