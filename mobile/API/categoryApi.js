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

export const getCategoriesAPI = async () => {

    try {

        const response = await axios.get(`${baseURL}/category`, config)

        return response

    } catch ({ response }) {
        return response
    }

}

export const getCategoryAPI = async (id) => {

    try {

        const response = await axios.get(`${baseURL}/category/${id}`, config)

        return response

    } catch ({ response }) {
        return response
    }

}

export const updateCategoryAPI = async ({ id, values }) => {
    try {

        if (values.images) {
            values.images = await setImages(values.images)
            console.log(values.images)
        } else {
            delete values?.images
        }

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

        const response = await axios.put(`${baseURL}/category/${id}`, formData, config)

        return response

    } catch ({ response }) {
        return response
    }

}