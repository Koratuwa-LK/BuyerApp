import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import OrderScreen from "../screens/OrderScreen";
import MarketScreen from "../screens/MarketScreen";
import HomeScreen from "../screens/HomeScreen";
import TransportScreen from "../screens/TransportScreen";
import landingScreen from "../screens/landingscreen";
import listScreen from "../screens/listscreen";
import mapScreen from "../screens/mapscreen";
import bookingscreen from "../screens/bookingscreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoadingScreen from "../screens/LoadingScreen";
import BookinghistoryScreen from "../screens/bookinghistoryscreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import ReviewScreen from "../screens/ReviewScreen";
import SubscribeHome from "../screens/SubscribeHome";
import NotificationHome from "../screens/NotificationScreen";
import NotificationScreen from "../screens/NotificationScreen";

const OrderNavigator = createStackNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Home: HomeScreen,
  Market: MarketScreen,
  Order: OrderScreen,
  Reviews: ReviewScreen,
  Transport: TransportScreen,
  OrderHistory: OrderHistoryScreen,
  Booking: landingScreen,
  History: BookinghistoryScreen,
  List: listScreen,
  Mapview: mapScreen,
  Checkout: bookingscreen,
  SubscribeHome: SubscribeHome,
  NotificationScreen: NotificationScreen
});

export default createAppContainer(OrderNavigator);
