const path = 'public/uploads/'

const uploadSingle = async ({ imageFile, request }) => {

    const fileName = imageFile.filename;

    const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    const image = `${basePath}${fileName}`

    return image;

}

const uploadMultiple = async ({ imageFiles, request }) => {
    const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    const images = imageFiles.map(image => {
        return {
            public_id: `${path}${image.filename}`,
            url: `${basePath}${image.filename}`,
            name: `${image.filename}`,
        }
    })

    return images
}

module.exports = {
    uploadMultiple,
    uploadSingle
}