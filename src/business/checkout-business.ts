import { AggregatedProducts, IPromotionsBusiness, Product } from "../types";

export class CheckoutBusiness {
  private promotionsBusiness: IPromotionsBusiness;
  constructor(promotionsBusiness: IPromotionsBusiness) {
    this.promotionsBusiness = promotionsBusiness;
  }

  checkout(order: Product[]) {
    const aggregatedProducts = this.scan(order);
    const productsWithDiscounts =
      this.promotionsBusiness.calculatePromotions(aggregatedProducts);
    return this.getFinalPrice(productsWithDiscounts);
  }

  private scan(products: Product[]): AggregatedProducts[] {
    const aggregatedProducts: AggregatedProducts[] = [];
    products.reduce(function (res: any, value: any) {
      if (!res[value.id]) {
        res[value.id] = {
          id: value.id,
          quantity: 0,
          promotion_id: value.promotion_id,
          subtotal: 0,
        };
        aggregatedProducts.push(res[value.id]);
      }
      res[value.id].quantity += value.quantity;
      res[value.id].subtotal += value.price;
      return res;
    }, {});
    return aggregatedProducts;
  }
  private getFinalPrice(productsWithDiscounts: AggregatedProducts[]): number {
    return productsWithDiscounts
      .map((product) => product.subtotal)
      .reduce((prev, next) => prev + next);
  }
}
