import * as Yup from "yup";

export default LoginValidation = Yup.object().shape({
    name: Yup.string()
        .required('This field is required'),
    description: Yup.string()
        .required('This field is required'),
    // images: Yup
    //     .mixed()
    //     .test("filesize", "File size is too large", (value) => {
    //         if (value && value?.length > 0) {
    //             for (let i = 0; i < value.length; i++) {
    //                 if (value[i].size > 5 * 1000000) {
    //                     return false;
    //                 }
    //             }
    //         }
    //         return true;
    //     })
    //     .test("filetype", "Unsupported file format, please image only ", (value) => {
    //         if (value && value.length > 0) {
    //             for (let i = 0; i < value.length; i++) {
    //                 if (value[i].type != "image/png" && value[i].type != "image/jpg" && value[i].type != "image/jpeg") {
    //                     return false;
    //                 }
    //             }
    //         }
    //         return true;
    //     }),
});

