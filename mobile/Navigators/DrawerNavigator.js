import * as React from "react";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    NativeBaseProvider,
    Button,
    Box,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    HStack,
    Divider,
    Icon,
    View,
} from "native-base";

import TabNavigator from "./TabNavigator";
import Header from "../Shared/Header";
import { logout } from "../utils/user";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../Redux/Actions/userActions";
import AdminNavigators from "./AdminNavigators";
import { TouchableOpacity } from "react-native-gesture-handler";
global.__reanimatedWorkletInit = () => { };

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} safeArea>
                <VStack space="6" my="2" mx="1">
                    <Box px="4" pb={10} backgroundColor={'#FED9ED'}>
                        <Text bold color="gray.700">
                            MGC Administration
                        </Text>
                        <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
                            {userInfo.name}
                        </Text>
                    </Box>
                    <VStack divider={<Divider />} space="4">
                        <VStack space="1">
                            {props.state.routeNames.map((name, index) => (
                                <Pressable
                                    key={index}
                                    px="5"
                                    py="3"
                                    rounded="md"
                                    bg={
                                        index === props.state.index
                                            ? "rgba(6, 182, 212, 0.1)"
                                            : "transparent"
                                    }
                                    onPress={(event) => {
                                        props.navigation.navigate(name);
                                    }}
                                >
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color={
                                                index === props.state.index ? "primary.500" : "gray.500"
                                            }
                                            size="5"
                                            as={<MaterialCommunityIcons
                                                // name={getIcon(name)}
                                                name='view-dashboard'
                                            />}
                                        />
                                        <Text
                                            style={{ marginLeft: -15 }}
                                            fontWeight="500"
                                            color={
                                                index === props.state.index ? "primary.500" : "gray.700"
                                            }
                                        >
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                            ))}
                            {/* <DrawerItemList {...props} /> */}
                        </VStack>
                        {/* <VStack space="5">
                            <Text fontWeight="500" fontSize="14" px="5" color="gray.500">
                                Labels
                            </Text>
                            <VStack space="3">
                                <Pressable px="5" py="3">
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color="gray.500"
                                            size="5"
                                            as={<MaterialCommunityIcons name="bookmark" />}
                                        />
                                        <Text color="gray.700" fontWeight="500">
                                            Family
                                        </Text>
                                    </HStack>
                                </Pressable>
                                <Pressable px="5" py="2">
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color="gray.500"
                                            size="5"
                                            as={<MaterialCommunityIcons name="bookmark" />}
                                        />
                                        <Text color="gray.700" fontWeight="500">
                                            Friends
                                        </Text>
                                    </HStack>
                                </Pressable>
                                <Pressable px="5" py="3">
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color="gray.500"
                                            size="5"
                                            as={<MaterialCommunityIcons name="bookmark" />}
                                        />
                                        <Text fontWeight="500" color="gray.700">
                                            Work
                                        </Text>
                                    </HStack>
                                </Pressable>
                            </VStack>
                        </VStack> */}
                    </VStack>
                </VStack>
            </DrawerContentScrollView>
            <Divider />
            <View style={{ padding: 20, }} ml={1}>
                <TouchableOpacity onPress={() => {
                    dispatch(logoutAction());
                    props.navigation.navigate('Home');
                }}
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}
                >
                    <MaterialCommunityIcons name={'logout'} size={25} />
                    <Text fontWeight="500">Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default DrawerNavigator = () => {
    return (
        <Box flex={1}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            // screenOptions={{
            //     header: ({ navigation, route, options }) => {
            //         return <Header navigation={navigation} />
            //     }
            // }}
            >
                {/* <Drawer.Screen
                    name="Home"
                    component={TabNavigator}
                    options={{
                        drawerLabel: 'Home',
                    }}
                    initialParams={{ screen: 'HomeScreen' }}
                />
                <Drawer.Screen name="My Account" component={TabNavigator}
                    initialParams={{ screen: 'User' }}
                /> */}

                <Drawer.Screen name="Dashboard" component={AdminNavigators}
                    initialParams={{ screen: 'Dashboard' }}
                />

                <Drawer.Screen name="Orders" component={AdminNavigators}
                    initialParams={{ screen: 'OrdersList' }}
                />


                <Drawer.Screen name="Products" component={AdminNavigators}
                    initialParams={{ screen: 'ProductsList' }}
                />

                <Drawer.Screen name="Categories" component={AdminNavigators}
                    initialParams={{ screen: 'CategoriesList' }}
                />

                <Drawer.Screen name="Users" component={AdminNavigators}
                    initialParams={{ screen: 'UsersList' }}
                />

            </Drawer.Navigator>
        </Box>
    );
}