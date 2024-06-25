import { RootState } from "../redux/store"

export function changeCartTotal(state: RootState['cart']) {
  const totalPrice = state.items.reduce((value, item) => value + item.count * item.price, 0)
  const totalItems = state.items.reduce((value, item) => value + item.count, 0)
  return [totalPrice, totalItems]
}