import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base';
import { Avatar, Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function TrendProducts({ items }) {

    const navigation = useNavigation()

    const handleClick = (item) => {
        navigation.navigate('ProductDetails', item)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item._id} onPress={() => handleClick(item)} style={{ padding: 5, width: 250, }}>
            <Card style={{ height: 300 }} >
                <Card.Cover source={{ uri: item?.images[0]?.url }} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} />
                <Card.Title titleStyle={{ fontWeight: 800 }} title={item.name}
                // subtitle="Card Subtitle"
                // left={LeftContent}
                />
                <Card.Content style={{ marginTop: -10 }}>
                    {/* <Text variant="titleLarge">Card title</Text> */}
                    <Text variant="bodyMedium">{item.description}</Text>
                </Card.Content>
                {/* <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions> */}
            </Card>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                marginX={3}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Optional: hide the horizontal scroll indicator
            />
        </View>
    )
}