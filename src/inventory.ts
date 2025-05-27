export type ProductCode = string;
export type Product = {
  name: string;
  price: number;
}

export const PRODUCT_INVENTORY: Record<ProductCode, Product> = {
  'SR1': {
    name: 'Strawberries',
    price: 500,
  },
  'FR1': {
    name: 'Fruit Tea',
    price: 311,
  },
  'CF1': {
    name: 'Coffee',
    price: 1123,
  },
};