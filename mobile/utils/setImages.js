import mime from 'mime'

export const setImages = async (images) => {
    console.log(images)
    try {

        const formattedImages = images.map(image => {
            const newImageUri = "file:///" + image.split("file:/").join("");
            return {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            };
        });
        // console.log(formattedImages + "Asd")
        return formattedImages

    } catch (err) {
        console.log(err)
    }
}

const setImage = async (image) => {

    const newImageUri = "file:///" + image.split("file:/").join("");

    return {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
    };

}