import { ImageType } from './Image';

export type ProductBaseType = {
  id: string,
  attributes: ProductType
}

export type ProductType = {
  name: string,
  description: string,
  cover: ImageType,
  price: number,
}
