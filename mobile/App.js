import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { NativeBaseProvider, extendTheme } from 'native-base';

import DrawerNavigator from './Navigators/DrawerNavigator';


const theme = extendTheme({ colors: newColorTheme });
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <StatusBar style='auto' />
          {/* <Header /> */}
          <DrawerNavigator />
          {/* <TabNavigator /> */}
          {/* <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        
      </Stack.Navigator> */}

          <Toast />
        </NativeBaseProvider>
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
