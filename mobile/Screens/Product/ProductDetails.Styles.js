import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    notSelectedSize: {
        width: 60,
        height: 35,
        backgroundColor: '#E7BCDE',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    selectedSize: {
        width: 62,
        height: 37,
        elevation: 10,
        backgroundColor: '#67729D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    colorsContainer: {
        width: '100%',
        paddingHorizontal: 2,
        gap: 20,
        overflow: 'scroll',
    },
    notSelectedcolor: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth: 1,

    },
    productName: {
        fontSize: 18
    },
    infoContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    selectedImage: {
        width: 300,
        height: 300,
        borderColor: '#67729D',
        borderWidth: 5,
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    imagesContainer: {
        height: 300,
        gap: 10,
        display: 'flex'
    },
    images: {
        width: 140,
        height: 140,
        borderColor: '#67729D',
        borderWidth: 2,
        marginBottom: 10
    }
})