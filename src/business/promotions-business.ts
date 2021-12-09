import {
  AggregatedProducts,
  IPromotionsBusiness,
  PromotionalRule,
  PromotionalRuleTypes,
  PromotionalRuleTypesIds,
} from "../types";
import fs from "fs";

export class PromotionBusiness implements IPromotionsBusiness {
  constructor() {}

  calculatePromotions(
    productGroup: AggregatedProducts[]
  ): AggregatedProducts[] {
    const orderWithDiscounts: AggregatedProducts[] = [];
    for (let index = 0; index < productGroup.length; index++) {
      const product = productGroup[index];
      switch (product.promotion_id) {
        case PromotionalRuleTypesIds.AMOUNT:
          const productsWithAmountDiscount =
            this.calculateAmountPromotion(product);
          orderWithDiscounts.push(productsWithAmountDiscount);
          break;
        case PromotionalRuleTypesIds.PERCENTAGE:
          const productsWithDiscountPercentage =
            this.calculatePercentagePromotion(product);
          orderWithDiscounts.push(productsWithDiscountPercentage);
        default:
          break;
      }
    }
    return orderWithDiscounts;
  }

  calculateAmountPromotion(
    products: AggregatedProducts
  ): AggregatedProducts {
    const amountPromotion = this.getCurrentPromotions().find(
      (promotion) => promotion.type === PromotionalRuleTypes.AMOUNT
    );

    let finalPrice;

    if (amountPromotion) {
      products.subtotal >= amountPromotion.min_value
        ? (finalPrice = products.subtotal - amountPromotion.discount)
        : (finalPrice = products.subtotal);
    }
    return { ...products, subtotal: finalPrice as number || products.subtotal };
  }

  calculatePercentagePromotion(
    products: AggregatedProducts
  ): AggregatedProducts {
    const percentagePromotion = this.getCurrentPromotions().find(
      (promotion) => promotion.type === PromotionalRuleTypes.PERCENTAGE
    );

    let finalPrice;

    if (percentagePromotion) {
      products.quantity >= percentagePromotion.min_value
        ? (finalPrice = this.calculatePercentage(products.subtotal, percentagePromotion.discount))
        : (finalPrice = products.subtotal);
    }

    return { ...products, subtotal: finalPrice as number || products.subtotal };
  }

  getCurrentPromotions(): PromotionalRule[] {
    return JSON.parse(
      fs.readFileSync("./src/data/promotional_rules.json", "utf8")
    );
  }

  calculatePercentage(value: number, percentage: number): number {
    return value - (value * percentage);
  } 
}
