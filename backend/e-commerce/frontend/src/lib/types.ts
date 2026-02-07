export type ProductDetail = {
    _id: string
    productName: string
    productDescription?: string
    price: {
        amount: number;
        currency: string
    }
    image: string[]
};