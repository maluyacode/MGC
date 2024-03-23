import axios from "axios"
import baseURL from "../assets/common/baseUrl";
import mime from 'mime'
import SyncStorage from 'sync-storage'

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': SyncStorage.get('token')
    }
}

const setImages = async (images) => {
    const formattedImages = images.map(image => {
        const newImageUri = "file:///" + image.split("file:/").join("");
        return {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        };
    });
    console.log(formattedImages)
    return formattedImages
}

const setImage = async (image) => {

    const newImageUri = "file:///" + image.split("file:/").join("");

    return {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
    };

}

export const createCategory = async (values) => {

    try {


        values.images = await setImages(values.images)
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                for (let i in value) {
                    formData.append(key, value[i]);
                }
            } else {
                formData.append(key, value);
            }
        })

        const response = await axios.post(`${baseURL}/category`, formData, config)

        return response

    } catch ({ response }) {
        return response
    }
}