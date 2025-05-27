import type { ProductCode } from "./inventory";

type BulkQuantityDiscountRule = {
  name: 'bulk-quantity-discount';
  quantity: number;
  discountedPricePerItem: number;
}

type BuyOneGetOneFreeRule = {
  name: 'buy-one-get-one-free';
}

type Rules = BulkQuantityDiscountRule | BuyOneGetOneFreeRule;

export type ProductCodeRules = Record<ProductCode, Rules[]>;