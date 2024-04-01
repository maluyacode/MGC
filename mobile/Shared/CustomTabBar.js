import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

export default function CustomTabBar({ state, descriptors, navigation }) {

    // const { isTabShow } = useSelector(state => state.userInterface)
    // console.log(state)
    return (
        <>
            <View style={[styles.containerTab]}>
                {state.routes.map((route, index) => {
                    if (route.name !== 'CHANGE LATER') {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            console.log("Asd")
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        return (
                            <>
                                {route.name !== 'Cart' && (
                                    <TouchableOpacity
                                        key={index}
                                        accessibilityRole="button"
                                        accessibilityState={isFocused ? { selected: true } : {}}
                                        accessibilityLabel={options.tabBarAccessibilityLabel}
                                        testID={options.tabBarTestID}
                                        onPress={onPress}
                                        onLongPress={onLongPress}
                                        style={styles.itemTab}
                                    >
                                        {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                {label}
                            </Text> */}
                                        {GetIcon({
                                            name: route.name, isFocused: isFocused
                                        })}
                                    </TouchableOpacity>
                                )}
                            </>
                        );
                    }
                })}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    containerTab: {
        height: 50,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: '#FED9ED',
        alignItems: 'center',
        elevation: 10
    },
    itemTab: {
        // display: 'flex',
        // flexDirection: 'row',
        // width: '10%'
    }
})

const GetIcon = ({ name, isFocused }) => {
    switch (name) {
        case 'HomeScreen':
            return <MaterialCommunityIcons style={{ color: isFocused ? '#67729D' : '#BB9CC0' }} size={30} name={'home'} />
        case 'Order':
            return <MaterialCommunityIcons style={{ color: isFocused ? '#67729D' : '#BB9CC0' }} size={27} name={'package'} />
        case 'Products':
            return <MaterialCommunityIcons name={'tshirt-v'} />
        case 'Reviews':
            return <MaterialCommunityIcons name={'star'} style={{ color: isFocused ? '#67729D' : '#BB9CC0' }} size={27} />
        case 'User':
            return <FontAwesome style={{ color: isFocused ? '#67729D' : '#BB9CC0' }} name={'user'} size={27} />
        default:
            return <MaterialCommunityIcons name={'view-dashboard'} />
    }
}