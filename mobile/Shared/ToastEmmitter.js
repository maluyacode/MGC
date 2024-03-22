import Toast from "react-native-toast-message";

class ToastEmmitter {

    static success(title = 'Successfull operation', message = '', position = 'top') {
        Toast.show({
            topOffset: 60,
            type: "success",
            text1: title,
            text2: message,
        });
    }

    static error(title = 'Please try again later', message = '', position = 'bottom') {
        Toast.show({
            position: position,
            bottomOffset: 20,
            type: "error",
            text1: title,
            text2: message,
        });
    }

    // static info(message = 'Success', position = 'top-center') {
    //     toast.info(message, {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });
    // }

    // static warning(message = 'Success', position = 'top-center') {
    //     toast.warning(message, {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });
    // }
}

export default ToastEmmitter