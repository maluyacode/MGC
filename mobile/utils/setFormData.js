export const setFormData = async (values) => {
    const formData = new FormData();
    console.log(values)

    Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            for (let i in value) {
                formData.append(key, value[i]);
            }
        } else {
            formData.append(key, value);
        }
    })

    return formData
}