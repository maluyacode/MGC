const path = 'public/uploads/'
const cloudinary = require('cloudinary')

const uploadSingle = async ({ imageFile, request }) => {

    // const fileName = imageFile.filename;

    // const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    // const image = `${basePath}${fileName}`

    // return image;
    const result = await cloudinary.v2.uploader.upload(imageFile, {
        folder: `tupt-online-platform`, // folder name in cloudinary, if not exist it will create automatically.
        // width: 200, 
        // crop: "scale",
    });

    return result.secure_url
    // return {
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //     original_name: postImage.orginalname
    // }


}

const uploadMultiple = async ({ imageFiles, request }) => {
    // const basePath = `${request.protocol}://${request.get('host')}/${path}`;

    // const images = imageFiles.map(image => {
    //     return {
    //         public_id: `${path}${image.filename}`,
    //         url: `${basePath}${image.filename}`,
    //         name: `${image.filename}`,
    //     }
    // })

    // return images

    let images = []
    for (let i = 0; i < imageFiles.length; i++) {

        let image = imageFiles[i].path;

        const result = await cloudinary.v2.uploader.upload(image, {
            folder: `tupt-online-platform`, // folder name in cloudinary, if not exist it will create automatically.
            // width: 200, 
            // crop: "scale",
        });
        console.log(imageFiles[i].originalname)
        images.push({
            public_id: result.public_id,
            url: result.secure_url,
            original_name: imageFiles[i].originalname
        })
    }

    return images
}

module.exports = {
    uploadMultiple,
    uploadSingle
}