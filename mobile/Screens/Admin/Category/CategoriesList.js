import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../../Shared/Form/Button'

export default function CategoriesList({ navigation }) {
    return (
        <View>
            <Text>CategoriesList</Text>
            <Button title='Add' onPress={() => navigation.navigate('CategoryCreate')} />
        </View>
    )
}