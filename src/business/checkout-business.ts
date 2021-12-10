import { AggregatedProducts, ICheckoutBusiness, IPromotionsBusiness, Product } from "../types";

export class CheckoutBusiness implements ICheckoutBusiness {
  private promotionsBusiness: IPromotionsBusiness;
  constructor(promotionsBusiness: IPromotionsBusiness) {
    this.promotionsBusiness = promotionsBusiness;
  }

  checkout(order: Product[]): number {
    const aggregatedProducts = this.scan(order);
    const productsWithDiscounts =
      this.promotionsBusiness.calculatePromotions(aggregatedProducts);
    return this.getFinalPrice(productsWithDiscounts);
  }

  scan(products: Product[]): AggregatedProducts[] {
    const aggregatedProducts: AggregatedProducts[] = [];
    products.reduce(function (res: any, value: any) {
      if (!res[value.id]) {
        res[value.id] = {
          id: value.id,
          quantity: 0,
          promotion_id: value.promotion_id,
          individual_price: value.price,
          subtotal: 0,
        };
        aggregatedProducts.push(res[value.id]);
      }
      res[value.id].quantity += value.quantity;
      return res;
    }, {});
    return aggregatedProducts.map((product) => ({
      ...product,
      subtotal: product.quantity * product.individual_price!,
    }));
  }

  getFinalPrice(productsWithDiscounts: AggregatedProducts[]): number {
    return productsWithDiscounts
      .map((product) => product.subtotal)
      .reduce((prev, next) => prev + next);
  }
}
