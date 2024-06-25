import { CartInitial, CartItemType } from "../redux/Slices/cart.slice"

export function hasSameItem(items: CartInitial['items'], payload: Omit<CartItemType, 'count'>) {
  if (!items.length) return false
  for (let item of items) {
    const keysArray = Object.keys(item).filter(key => key !== 'count') as Array<keyof Omit<CartItemType, 'count'>>
    let isSame = true
    for (let key of keysArray) {
        if (item[key] !== payload[key]) {
          isSame = false
        }
    }
    if (isSame) return true
  }
  return false
}