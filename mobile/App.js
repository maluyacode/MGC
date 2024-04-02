import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Button, Container, NativeBaseProvider, extendTheme } from 'native-base';

// import DrawerNavigator from './Navigators/DrawerNavigator';
import { Provider, useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import store from './Redux/store';
// import TabNavigator from './Navigators/TabNavigator';
import Main from './Main';
import SyncStorage from 'sync-storage';
import { useEffect } from 'react';
import 'react-native-svg'


const theme = extendTheme({
  colors:
  {
    brand: {
      900: "#8287af",
      800: "#7c83db",
      700: "#b3bef6",
    },
    mycustom: {
      900: "#67729D90",
      800: "#67729D90",
      700: "#67729D90",
      600: "#67729D",
      500: "#67729D10",
      400: "#67729D10",
      300: "#67729D10",
      200: "#67729D10",
      100: "#67729D10",
    }
  },
});

export default function App() {

  const asyncStorage = async () => {
    const data = await SyncStorage.init();
    const cartItems = SyncStorage.get('cartItems')
    // console.log('AsyncStorage is ready!', cartItems);
  }

  useEffect(() => {
    asyncStorage()
  }, [])


  return (
    <>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <PaperProvider>
            <Provider store={store}>

              <StatusBar style='auto' />

              <Main />

              <Toast />

            </Provider>
          </PaperProvider>
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
