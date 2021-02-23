export interface Product {
    id,
    name,
    price,
    stock_quantity,
    qtyCommanded
}
export interface PaypalProduct{
    name: String;
    quantity: String,
    category: string,
    unit_amount: {
      currency_code: string,
      value: string
    }
  }
