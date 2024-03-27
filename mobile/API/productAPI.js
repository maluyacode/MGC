import axios from "axios"
import baseURL from "../assets/common/baseUrl";
import SyncStorage from 'sync-storage'
import { setImages } from "../utils/setImages";
import { setFormData } from "../utils/setFormData";

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': SyncStorage.get('token')
    }
}

export const productCreateAPI = async (values) => {
    try {

        values.images = await setImages(values.images);

        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('category', values.category);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('brand', values.brand);
        formData.append('colors', JSON.stringify(values.colors));
        formData.append('sizes', JSON.stringify(values.sizes));

        values.images.map(image => {
            formData.append('images', image);
        })

        const response = await axios.post(`${baseURL}/product/`, formData, config)
        return response

    } catch ({ response }) {
        console.log(response)
        return response
    }
}