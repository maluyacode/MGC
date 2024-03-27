import { View, Text } from 'react-native'
import React from 'react'
import { AddIcon, Box, Button, Input, SearchIcon } from 'native-base'

export default function ProductsList({ navigation }) {
    return (
        <>
            <View>
                <Box style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-between', padding: 5, height: 45 }}>
                    <Input onChangeText={value => console.log(value)} width={'85%'} placeholder='Search' leftElement={
                        <View style={{ marginHorizontal: 10, marginRight: -5 }}>
                            <SearchIcon />
                        </View>
                    } />
                    <Button variant={'outline'} size={'xs'} borderColor={'#67729D'} onPress={() => navigation.navigate('ProductCreate')} >
                        <AddIcon />
                        {/* <Text color={'gray.500'}>Add New</Text> */}
                    </Button>
                </Box>
            </View>
        </>
    )
}