import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Cart from '../Screens/Cart/Cart';
import { Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();


export default function CartNavigators() {

    const navigation = useNavigation()

    return (
        <Stack.Navigator>
            <Stack.Group>

                <Stack.Screen
                    name='CartScreen'
                    component={Cart}
                    options={{
                        headerShown: true,
                        animationEnabled: false,
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
        fontSize: 25,
        fontWeight: '700',
        color: '#67729D',
        // marginLeft: -15
    }
});