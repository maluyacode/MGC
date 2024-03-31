import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Cart from '../Screens/Cart/Cart';
import { Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Shipping from '../Screens/Cart/Shipping';
import Payment from '../Screens/Cart/Payment';
import OrderSummary from '../Screens/Cart/OrderSummary';
import Success from '../Screens/Cart/Success';

const Stack = createStackNavigator();


export default function CartNavigators() {

    const navigation = useNavigation()

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return (
        <Stack.Navigator>
            <Stack.Group
                screenOptions={{
                    // animationEnabled: true,
                    // presentation: 'card',
                    // gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: config,
                    }
                }}
            >

                <Stack.Screen
                    name='CartScreen'
                    component={Cart}
                    options={{
                        // headerShown: true,
                        // cardShadowEnabled: true,
                        // animationEnabled: true,
                        // animationTypeForReplace: 'push',
                        header: () => (
                            <Box safeArea style={styles.topView}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Pressable onPress={() => navigation.goBack()}>
                                        {/* <MaterialCommunityIcons name={'backburger'} size={25} /> */}
                                        <Entypo name="back" size={25} color="gray" />
                                    </Pressable>
                                    <Text style={styles.logoText}>{'Shopping Cart'}</Text>
                                </View>
                            </Box>
                        ),
                    }}
                />

                <Stack.Screen
                    name='Shipping'
                    component={Shipping}
                    options={{
                        headerShown: false,
                        // animationEnabled: false,
                        header: () => (
                            <Box safeArea style={styles.topView}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Pressable onPress={() => navigation.navigate('CartScreen')}>
                                        {/* <MaterialCommunityIcons name={'backburger'} size={25} /> */}
                                        <Entypo name="back" size={25} color="gray" />
                                    </Pressable>
                                    <Text style={styles.logoText}>{'Shipping Information'}</Text>
                                </View>
                            </Box>
                        ),
                    }}
                />

                <Stack.Screen
                    name='Payment'
                    component={Payment}
                    options={{
                        headerShown: false,
                        // animationEnabled: false,
                        header: ({ route, navigation }) => (
                            <Box safeArea style={styles.topView}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Pressable onPress={() => navigation.goBack()}>
                                        {/* <MaterialCommunityIcons name={'backburger'} size={25} /> */}
                                        <Entypo name="back" size={25} color="gray" />
                                    </Pressable>
                                    <Text style={styles.logoText}>{'Payment Information'}</Text>
                                </View>
                            </Box>
                        ),
                    }}
                />

                <Stack.Screen
                    name='Summary'
                    component={OrderSummary}
                    options={{
                        headerShown: false,
                        // animationEnabled: false,
                        header: ({ route, navigation }) => (
                            <Box safeArea style={styles.topView}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Pressable onPress={() => navigation.goBack()}>
                                        {/* <MaterialCommunityIcons name={'backburger'} size={25} /> */}
                                        <Entypo name="back" size={25} color="gray" />
                                    </Pressable>
                                    <Text style={styles.logoText}>{'Order Summary'}</Text>
                                </View>
                            </Box>
                        ),
                    }}
                />

                <Stack.Screen
                    name='Success'
                    component={Success}
                    options={{
                        headerShown: false,
                        // animationEnabled: false,
                        header: ({ route, navigation }) => (
                            <Box safeArea style={styles.topView}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Pressable onPress={() => navigation.goBack()}>
                                        {/* <MaterialCommunityIcons name={'backburger'} size={25} /> */}
                                        <Entypo name="back" size={25} color="gray" />
                                    </Pressable>
                                    <Text style={styles.logoText}>{'Order Success'}</Text>
                                </View>
                            </Box>
                        ),
                    }}
                />

            </Stack.Group>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    topView: {
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingLeft: 15,
        // elevation: 5,
        backgroundColor: '#FED9ED',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#67729D',
        // marginLeft: -15
    }
});