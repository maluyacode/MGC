// import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { SafeAreaView, View, StyleSheet, Dimensions, StatusBar, ScrollView } from 'react-native'

var { width } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight || 0;

const Container = ({ children, style, ...props }) => {
    return (
        <SafeAreaView style={[styles.container, style]} >
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                <View>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        // paddingTop: statusBarHeight,
        backgroundColor: '#FED9ED',
    }
})

export default Container