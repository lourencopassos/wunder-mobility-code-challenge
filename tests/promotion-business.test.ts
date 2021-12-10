import { PromotionBusiness } from "../src/business/promotions-business";
import {
  mockProductPercentageWithPromo,
  mockProductPercentageWithoutPromo,
  mockProductAmountWithPromo,
  mockProductAmountWithoutPromo,
  aggregatedProductArray,
  aggregatedProductArrayAmountDiscount,
} from "../src/data/mocks";

const makePromotionsBusiness = () => {
  return new PromotionBusiness();
};

describe("Promotion Business (unit)", () => {
  describe("calculatePercentage", () => {
    it("Calculate the correct final value with percentage discount of 20% from 100, which is 80", () => {
      const promotionBusiness = makePromotionsBusiness();
      const percentage = promotionBusiness.calculateValueWithPercentageDiscount(
        100,
        0.2
      );
      expect(percentage).toBe(80);
    });
  });

  describe("calculatePercentagePromotion", () => {
    it("Calculate the correct percentage promotion for the given product", () => {
      const promotionBusiness = makePromotionsBusiness();
      const productWithPromotionApplied =
        promotionBusiness.calculatePercentagePromotion(
          mockProductPercentageWithPromo
        );

      expect(productWithPromotionApplied.subtotal).toBe(20);
    });
  });

  describe("calculatePercentagePromotion", () => {
    it("Don't apply the percentage promotion, since it does not meet the minimum requirements", () => {
      const promotionBusiness = makePromotionsBusiness();
      const productWithoutPromotionApplied =
        promotionBusiness.calculatePercentagePromotion(
          mockProductPercentageWithoutPromo
        );
      expect(productWithoutPromotionApplied.subtotal).toBe(10);
    });
  });

  describe("calculateAmountPromotion", () => {
    it("Calculate the correct amount promotion for the given product", () => {
      const promotionBusiness = makePromotionsBusiness();
      const productWithPromotionApplied =
        promotionBusiness.calculateAmountPromotion(mockProductAmountWithPromo);

      expect(productWithPromotionApplied.subtotal).toBe(9.75);
    });
  });

  describe("calculateAmountPromotion", () => {
    it("Don't apply the percentage promotion, since it does not meet the minimum requirements", () => {
      const promotionBusiness = makePromotionsBusiness();
      const productWithoutPromotionApplied =
        promotionBusiness.calculateAmountPromotion(
          mockProductAmountWithoutPromo
        );

      expect(productWithoutPromotionApplied.subtotal).toBe(4);
    });
  });

  describe("calculatePromotions", () => {
    it("Calculate the correct promotions values for percentage promotion", () => {
      const promotionBusiness = makePromotionsBusiness();
      const orderWithAppliedDiscounts = promotionBusiness.calculatePromotions(
        aggregatedProductArray
      );
      expect(orderWithAppliedDiscounts[0].subtotal).toBe(20);
      expect(orderWithAppliedDiscounts[1].subtotal).toBe(10);
    });
    it("Calculate the correct promotions values for amount promotion", () => {
      const promotionBusiness = makePromotionsBusiness();
      const orderWithAppliedDiscounts = promotionBusiness.calculatePromotions(
        aggregatedProductArrayAmountDiscount
      );
      expect(orderWithAppliedDiscounts[0].subtotal).toBe(39.75);
      expect(orderWithAppliedDiscounts[1].subtotal).toBe(19.75);
    });
  });
});
