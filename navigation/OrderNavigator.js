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
import NotificationScreen from "../screens/NotificationScreen";
import NotificationHistory from "../screens/notificationHistory";
import FarmerScreen from "../screens/FarmerScreen";
import FirstScreen from "../screens/firstscreen";


const OrderNavigator = createStackNavigator({
  Loading: LoadingScreen,
  First: FirstScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Home: HomeScreen,
  Market: MarketScreen,
  Order: OrderScreen,
  Farmer: FarmerScreen,
  Reviews: ReviewScreen,
  Transport: TransportScreen,
  OrderHistory: OrderHistoryScreen,
  Booking: landingScreen,
  History: BookinghistoryScreen,
  List: listScreen,
  Mapview: mapScreen,
  Checkout: bookingscreen,
  SubscribeHome: SubscribeHome,
  NotificationScreen: NotificationScreen,
  NotificationHistory:NotificationHistory
});

export default createAppContainer(OrderNavigator);
