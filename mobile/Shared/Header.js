import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Badge } from 'react-native-elements';

const Header = ({ navigation }) => {


    return (
        <Box safeArea style={styles.topView}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {/* <Pressable onPress={() => navigation.toggleDrawer()}>
                    <Ionicons name='menu' size={25} />
                </Pressable> */}
                <Text style={styles.logoText}>MGC</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
                <TouchableOpacity>
                    <FontAwesome name='search' size={25} color={'#67729D'} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name='shopping-cart' size={25} color={'#67729D'} />
                    <Badge status='error'
                        value={3}
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                    />
                </TouchableOpacity>
            </View>
        </Box>
    )
}

const styles = StyleSheet.create({
    topView: {
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingLeft: 15,
        elevation: 5,
        backgroundColor: '#FED9ED',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoText: {
        fontSize: 25,
        fontWeight: '900',
        color: '#67729D'
    }
});

export default Header