import type { Product, ProductCode } from "./inventory";
import type { ProductCodeRules } from "./rules";
import { PRODUCT_INVENTORY } from "./inventory";

type CheckoutItem = Product & {
  quantity: number;
}

export class Checkout {
  #items: Map<ProductCode, CheckoutItem> = new Map<ProductCode, CheckoutItem>();

  constructor(rules?: ProductCodeRules) {
    // TODO: save rules
  }

  get items() {
    return Array.from(this.#items.values());
  }

  scan(productCode: ProductCode) {
    if (!(productCode in PRODUCT_INVENTORY)) {
      throw Error('Product not found')
    }

    if (this.#items.has(productCode)) {
      const item = this.#items.get(productCode);
      if (item !== undefined) {
        item.quantity++;
      }
    } else {
      const product = PRODUCT_INVENTORY[productCode];
      const checkoutItem = {
        ...product,
        code: productCode,
        quantity: 1,
      }
      this.#items.set(productCode, checkoutItem);
    }

    // TODO: apply rules. 
    // Iterate over the rules for the product code and either:
    // - increase quantity of item for the buy one get one free rule
    // - change the price of the item. Consider adding a new 'discountedPrice' field so we can still display the original price.
  } 

  total() {
    return this.items.reduce((total, { price, quantity }) => 
      total + (price * quantity)
    , 0);
  }
}