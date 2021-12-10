import { CheckoutBusiness } from "../src/business/checkout-business";
import { PromotionBusiness } from "../src/business/promotions-business";
import {
  mockProductPercentageWithPromo,
  mockProductPercentageWithoutPromo,
  mockProductAmountWithPromo,
  mockProductAmountWithoutPromo,
  aggregatedProductArray,
  aggregatedProductArrayAmountDiscount,
  rawProductsArray,
} from "../src/data/mocks";

const makeCheckoutBusiness = () => {
  const promotionBusiness = new PromotionBusiness();
  return new CheckoutBusiness(promotionBusiness);
};

describe("checkoutBusiness", () => {
  describe("getFinalPrice", () => {
    it("should return the correct value for the final price", () => {
      const checkoutBusiness = makeCheckoutBusiness();
      const finalPrice = checkoutBusiness.getFinalPrice(aggregatedProductArray);
      expect(finalPrice).toBe(60);
    });
  });
  describe("scan", () => {
    it("should return the correct value for the quantity and subtotal", () => {
      const checkoutBusiness = makeCheckoutBusiness();
      const scannedProducts = checkoutBusiness.scan(rawProductsArray);
      expect(scannedProducts[0].subtotal).toBe(24);
      expect(scannedProducts[0].quantity).toBe(4);
      expect(scannedProducts[0].individual_price).toBe(6);
      expect(scannedProducts[1].subtotal).toBe(12);
      expect(scannedProducts[1].quantity).toBe(3);
      expect(scannedProducts[1].individual_price).toBe(4);
    });
  });
  describe("checkout", () => {
    it("should return the correct final price", () => {
      const checkoutBusiness = makeCheckoutBusiness();
      const checkoutProductsFinalPrice =
        checkoutBusiness.checkout(rawProductsArray);
      expect(checkoutProductsFinalPrice).toBe(24);
    });
  });
});
