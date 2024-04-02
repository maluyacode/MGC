const sizePrices = {
    "xs": 50,
    "s": 75,
    "m": 100,
    "l": 125,
    "xl": 150,
    "xxl": 200,
}

export const totalItemPrice = (quantity = 1, size, price) => {

    return (quantity * price) + sizePrices[size?.toLowerCase()]

}