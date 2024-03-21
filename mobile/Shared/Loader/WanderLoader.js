import React from 'react'
import Container from '../Container'
import { StyleSheet, Text, View } from 'react-native'
import { Chase, Flow, Plane, Swing, Wander } from 'react-native-animated-spinkit'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

const WanderLoader = ({ loadingText }) => {
    return (
        <Container>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                alignItems: 'center',
                top: '35%',
                height: height
            }}>
                <Chase size={48} color="#67729D" />
                <Text style={{ color: '#67729D', fontWeight: '400', fontSize: 14, marginTop: 15 }}>{loadingText}</Text>
            </View>
        </Container>
    )
}


export default WanderLoader