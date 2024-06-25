import { CartItemType } from '../redux/Slices/cart.slice'
import { RootState } from '../redux/store'

export function findSameItem(state: RootState['cart'], payload: Omit<CartItemType, 'count'>) {
  return state.items.find((item) => {
    const keysArray = Object.keys(item).filter((key) => key !== 'count') as Array<keyof Omit<CartItemType, 'count'>>
    for (let key of keysArray) {
      if (item[key] !== payload[key]) {
        return false
      }
    }
    return true
  })
}
