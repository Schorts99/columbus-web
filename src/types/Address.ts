export type AddressBaseType = {
  id: string,
  attributes: AddressType,
}

export type AddressType = {
  name: string,
  address: string,
  country: string,
  suburb?: string,
  state: string,
  // eslint-disable-next-line camelcase
  postal_code: string,
  city: string,
}
