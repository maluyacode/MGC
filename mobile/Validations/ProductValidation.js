import * as Yup from "yup";

export default ProductValidation = Yup.object().shape({
    name: Yup.string()
        .required('This field is required'),

    description: Yup.string()
        .required('This field is required'),

    category: Yup.string()
        .required('This field is required'),

    price: Yup.number()
        .required('This field is required'),

    stock: Yup.number()
        .required('This field is required'),

    brand: Yup.string()
        .required('This field is required'),

    colors: Yup.array()
        .test(() => {

        }),

    sizes: Yup.array()
        .required('This field is required'),
});

