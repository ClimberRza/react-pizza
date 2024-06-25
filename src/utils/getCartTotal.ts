import { CartItemType } from "../redux/Slices/cart.slice"

export function getCartTotal() {
  const str = localStorage.getItem('cart')
  if (str) {
    const cart: CartItemType[] = JSON.parse(str)
    const totalPrice = cart.reduce((value, item) => value + item.count * item.price, 0)
    const totalItems = cart.reduce((value, item) => value + item.count, 0)
    return [totalPrice, totalItems]
  } else {
    return [0, 0]
  }
}
