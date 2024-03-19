import * as Yup from "yup";

export default LoginValidation = Yup.object().shape({
    name: Yup.string()
        .required('This field is required'),
    email: Yup.string()
        .required('This field is required')
        .email("Invalid Email"),
    password: Yup.string()
        .required('This field is required')
        .min(2, "Pretty sure this will be hacked")
});

