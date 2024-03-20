import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Login from './Screens/User/Login';
import Home from './Screens/Home';
import Button from './Shared/Form/Button';
import Register from './Screens/User/Register';
import TabNavigator from './Navigators/TabNavigator';


export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style='auto' />
        <TabNavigator />

        {/* <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        
      </Stack.Navigator> */}

        <Toast />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED9ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
