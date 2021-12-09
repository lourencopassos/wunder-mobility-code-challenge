import { Request, Response } from "express";
import { ICheckoutBusiness } from "../types";

export class Controller {
  private checkoutBusiness: ICheckoutBusiness;
  constructor(checkoutBusiness: ICheckoutBusiness) {
    this.checkoutBusiness = checkoutBusiness;
  }

  checkout = async (req: Request, res: Response) => {
    try {
      const order = req.body;
      const finalPrice = this.checkoutBusiness.checkout(order);
      res.status(200).send({ message: `Final price is € ${finalPrice}` });
    } catch (error) {
      res.status(400).send(`Error: ${error}`);
    }
  };
}
