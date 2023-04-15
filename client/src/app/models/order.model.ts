export interface IOrder {
    _id: string,
    customer_id: string,
    order_date: Date,
    order_status: string,
    items: [
        {
            product_id: string,
            name: string,
            image: string,
            quantity: number,
            price: number
        }
    ],
    total_price: number
}