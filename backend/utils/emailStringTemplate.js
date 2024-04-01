exports.notifyAdminEmailMessage = async (order) => {

    let productList = "";


    order.orderItems.forEach((item, index) => {

        productList += `𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘐𝘋: ${item.product._id}\n𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘕𝘢𝘮𝘦: ${item.product.name}\n𝘘𝘶𝘢𝘯𝘵𝘪𝘵𝘺: ${item.quantity}\n𝘛𝘰𝘵𝘢𝘭: PHP${totalItemPrice(item.quantity, item.size, item.product.price)}\n\n`;
    });

    return `
Dear Admin,

We are pleased to inform you that a new order has been placed by a user. The details of the order are as follows:

𝗢𝗿𝗱𝗲𝗿 𝗜𝗗: ${order._id}
𝗨𝘀𝗲𝗿: ${order.user.name}
𝗘𝗺𝗮𝗶𝗹: ${order.user.email}
𝗣𝗵𝗼𝗻𝗲 𝗡𝘂𝗺𝗯𝗲𝗿: ${order.shippingInfo.phoneNo}

𝗢𝗿𝗱𝗲𝗿 𝗗𝗲𝘁𝗮𝗶𝗹𝘀:
${productList}

𝗧𝗼𝘁𝗮𝗹 𝗔𝗺𝗼𝘂𝗻𝘁: PHP${totalPrice(order.orderItems)}

𝗦𝗵𝗶𝗽𝗽𝗶𝗻𝗴 𝗔𝗱𝗱𝗿𝗲𝘀𝘀:
${order.shippingInfo.address}

Please take the necessary steps to process this order and notify the user about the estimated delivery time.

If you have any questions or need further information, please feel free to contact us.

Thank you for your attention.

Best regards,
𝙈𝙂𝘾`
}

exports.notifyUserEmailMessage = async (order) => {

    let productList = "";


    order.orderItems.forEach((item, index) => {

        productList += `𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘐𝘋: ${item.product._id}\n𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘕𝘢𝘮𝘦: ${item.product.name}\n𝘘𝘶𝘢𝘯𝘵𝘪𝘵𝘺: ${item.quantity}\n𝘛𝘰𝘵𝘢𝘭: ₱${totalItemPrice(item.quantity, item.size, item.product.price)}\n\n`;
    });

    return `
Dear ${order.user.name},

We are pleased to inform you that your order has been confirmed. Thank you for shopping with us!

Order Details:
${productList}

Total Amount: PHP${totalPrice(order.orderItems)}

Shipping Address:
${order.shippingInfo.address}

You will receive a notification once your order has been shipped. If you have any questions or need further assistance, please feel free to contact us.

Thank you for choosing us. We look forward to serving you again soon.

Best regards,
MGC`

}

exports.notifyShippedMessage = async (order) => {

    let productList = "";


    order.orderItems.forEach((item, index) => {

        productList += `𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘐𝘋: ${item.product._id}\n𝘗𝘳𝘰𝘥𝘶𝘤𝘵 𝘕𝘢𝘮𝘦: ${item.product.name}\n𝘘𝘶𝘢𝘯𝘵𝘪𝘵𝘺: ${item.quantity}\n𝘛𝘰𝘵𝘢𝘭: ₱${totalItemPrice(item.quantity, item.size, item.product.price)}\n\n`;
    });

    return `
Dear ${order.user.name},

We are excited to inform you that your order has been shipped! Your package is now on its way to you.

Order Details:
${productList}

Thank you for choosing us. If you have any questions or need further assistance, please feel free to contact us. We hope you enjoy your purchase!

Best regards,
MGC`
}

exports.notifyDeliveredMessage = async (order) => {

    return `
Dear ${order.user.name},

We are excited to inform you that your package has arrived at the shipping address provided:

Shipping Address:
${order.shippingInfo.address}

Please ensure someone is available to receive the package. If you have any questions or need further assistance, please feel free to contact us.

Thank you for choosing us. We hope you enjoy your purchase!

Best regards,
MGC`
}

const sizePrices = {
    "xs": 50,
    "s": 75,
    "m": 100,
    "l": 125,
    "xl": 150,
    "xxl": 200,
}

const totalItemPrice = (quantity = 1, size, price) => {

    return (quantity * price) + sizePrices[size.toLowerCase()]

}

const totalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((accumulator, item) => {
        return accumulator + totalItemPrice(item.quantity, item.size, item.product.price);
    }, 0);

    return totalPrice;
}