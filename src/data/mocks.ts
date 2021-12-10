import { AggregatedProducts, Product } from "../types";

export const mockProductPercentageWithPromo: AggregatedProducts = {
  product_id: 2,
  promotion_id: 1,
  quantity: 20,
  subtotal: 40,
};

export const mockProductPercentageWithoutPromo: AggregatedProducts = {
  product_id: 2,
  promotion_id: 1,
  quantity: 2,
  subtotal: 10,
};

export const mockProductAmountWithPromo: AggregatedProducts = {
  product_id: 1,
  promotion_id: 2,
  quantity: 10,
  subtotal: 10,
};

export const mockProductAmountWithoutPromo: AggregatedProducts = {
  product_id: 1,
  promotion_id: 2,
  quantity: 2,
  subtotal: 4,
};

export const aggregatedProductArray: AggregatedProducts[] = [
  { product_id: 2, promotion_id: 1, quantity: 10, subtotal: 40 },
  { product_id: 1, promotion_id: 1, quantity: 10, subtotal: 20 },
];

export const aggregatedProductArrayAmountDiscount: AggregatedProducts[] = [
  { product_id: 2, promotion_id: 2, quantity: 10, subtotal: 40 },
  { product_id: 1, promotion_id: 2, quantity: 5, subtotal: 20 },
];

export const rawProductsArray: Product[] = [
  { id: 2, name: "Hamburguer", price: 6, promotion_id: 1, quantity: 4 },
  { id: 3, name: "Sushi", price: 4, promotion_id: 1, quantity: 3 },
];
