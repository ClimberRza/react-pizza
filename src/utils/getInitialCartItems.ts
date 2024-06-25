import { CartItemType } from '../redux/Slices/cart.slice'

export const getInitialCartItems = (): CartItemType[] => {
  const str = localStorage.getItem('cart')
  if (str) {
    return JSON.parse(str)
  } else {
    return []
  }
}
