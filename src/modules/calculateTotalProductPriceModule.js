export function calculateTotalProductPriceModule(products) {
    return products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
}

// Ví dụ sử dụng hàm
const products = [
    { price: 100, quantity: 2 },
    { price: 200, quantity: 1 },
    { price: 50, quantity: 5 }
];
