import { ProductType } from './Product';

export type CartProduct = {
  product: ProductType,
  quantity: number,
}

export type CartProductBase = {
  id: string,
  attributes: CartProduct
}
