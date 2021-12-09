export interface Product {
  id: number;
  name: string;
  price: number;
  promotion_id: number;
}

export interface CheckoutProduct extends Product {
  total: number;
}

export interface CheckoutOrder {
  total_price: string;
  product_ids: number[];
}

export interface Order {
  products: number[];
  total: number;
}

export enum PromotionalRuleTypes {
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
}

export enum PromotionalRuleTypesIds {
  PERCENTAGE = 1,
  AMOUNT = 2,
}

export interface AggregatedProducts {
  product_id: number;
  subtotal: number;
  quantity: number;
  promotion_id: number;
}

export interface PromotionalRule {
  id: number;
  type: PromotionalRuleTypes;
  discount: number;
  min_value: number;
}

export interface IPromotionsBusiness {
  calculatePromotions(productGroup: AggregatedProducts[]): AggregatedProducts[];
  calculateAmountPromotion(
    calculateAmountPromotion: AggregatedProducts
  ): AggregatedProducts;
  calculatePercentagePromotion(
    calculateAmountPromotion: AggregatedProducts
  ): AggregatedProducts;
}

export interface ICheckoutBusiness {
  checkout(order: Product[]): number;
  scan(products: Product[]): AggregatedProducts[];
  getFinalPrice(productsWithDiscounts: AggregatedProducts[]): number;
}