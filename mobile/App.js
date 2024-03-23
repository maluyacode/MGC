import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Container, NativeBaseProvider, extendTheme } from 'native-base';

// import DrawerNavigator from './Navigators/DrawerNavigator';
import { Provider, useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import store from './Redux/store';
// import TabNavigator from './Navigators/TabNavigator';
import Main from './Main';
import SyncStorage from 'sync-storage';
import { useEffect } from 'react';

const theme = extendTheme({ colors: newColorTheme });
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

export default function App() {

  const asyncStorage = async () => {
    const data = await SyncStorage.init();
    console.log('AsyncStorage is ready!', data);
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
