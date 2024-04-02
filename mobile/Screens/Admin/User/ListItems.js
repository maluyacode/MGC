import { View, Text } from 'react-native'
import React, { Fragment, useCallback, useState } from 'react'
import { DataTable } from 'react-native-paper'
import { Box, Button, CloseIcon, Image } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ListItems({ item, deleteUser }) {

    const navigation = useNavigation();

    const [showAction, setShowAction] = useState(false);

    const toggleAction = () => {
        setShowAction(!showAction);
    }

    const handleEdit = (user) => {
        navigation.navigate('UserUpdate', user);
    }

    useFocusEffect(
        useCallback(() => {
            setShowAction(false)
        }, [])
    )

    return (
        <>
            <DataTable.Row style={{ paddingVertical: 5, }}
                onLongPress={!showAction ? toggleAction : undefined}
                onPress={!showAction ? () => console.log('View') : undefined}
            >
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', opacity: showAction ? 0.3 : 1 }}>
                    <DataTable.Cell style={{ padding: 0 }}>
                        <Box>
                            <Image alt={'No image'}
                                source={{
                                    uri:
                                        item?.image ||
                                        'https://via.placeholder.com/300'
                                }}
                                width={50} height={50} borderRadius={50} />
                        </Box>
                    </DataTable.Cell >
                    <DataTable.Cell numberOfLines={1} ellipsizeMode='tail' >{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.email}pcs</DataTable.Cell>
                    <DataTable.Cell numeric>{item.isAdmin ? 'Admin' : 'User'}</DataTable.Cell>
                </View>
                {showAction && (
                    <Box style={{
                        display: 'flex', flexDirection: 'row', gap: 5,
                        position: 'absolute',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        opacity: 1
                    }}>
                        <Button size={'xs'} p={2} onPress={() => handleEdit(item)}>
                            <MaterialCommunityIcons name={'file-edit'} size={18} />
                        </Button>
                        <Button onPress={() => deleteUser(item._id)} colorScheme={'danger'} size={'xs'} p={2}>
                            <MaterialCommunityIcons name={'delete'} size={18} />
                        </Button>
                        <Button ml={'auto'} size={'xs'} p={2} colorScheme={'danger'} onPress={toggleAction}>
                            <MaterialCommunityIcons name={'close-circle'} size={18} />
                        </Button>
                    </Box>
                )}
            </DataTable.Row>
        </>
    )
}