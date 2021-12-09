import express from "express";
import { CheckoutBusiness } from "../business/checkout-business";
import { PromotionBusiness } from "../business/promotions-business";
import { Controller } from "../controller/controller";

const router = express.Router();

const promotionsBusiness = new PromotionBusiness();
const checkoutBusiness = new CheckoutBusiness(promotionsBusiness);
const controller = new Controller(checkoutBusiness);

router.post("/checkout", controller.checkout);

export { router }