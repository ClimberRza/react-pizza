import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { hasSameItem } from '../../utils/stateHasSameItem'
import { findSameItem } from '../../utils/findSameItem'
import { changeCartTotal } from '../../utils/changeCartTotal'
import { getInitialCartItems } from '../../utils/getInitialCartItems'
import { getCartTotal } from '../../utils/getCartTotal'

export interface CartItemType {
  count: number
  id: number
  title: string
  price: number
  imageUrl: string
  size: 26 | 30 | 40
  type: 'Тонкое' | 'Традиционное'
}

export interface CartInitial {
  totalPrice: number
  totalItems: number
  items: CartItemType[]
}

export const initialState: CartInitial = {
  totalPrice: getCartTotal()[0],
  totalItems: getCartTotal()[1],
  items: getInitialCartItems(),
}
getInitialCartItems()
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItemType, 'count'>>) {
      if (hasSameItem(state.items, action.payload)) {
        const sameItem = findSameItem(state, action.payload)
        if (sameItem) sameItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      ;[state.totalPrice, state.totalItems] = changeCartTotal(state)
    },
    minusItem(state, action: PayloadAction<CartItemType>) {
      const pizza = findSameItem(state, action.payload)
      if (pizza) {
        if (+pizza.count === 0) return
        pizza.count--
      }
      ;[state.totalPrice, state.totalItems] = changeCartTotal(state)
    },
    deletePizza(state, action: PayloadAction<CartItemType>) {
      const pizza = findSameItem(state, action.payload)
      const confirm = window.confirm(`Удалить пиццу ${pizza?.title} из корзины?`)
      if (confirm) {
        state.items = state.items.filter((item) => item !== pizza)
        ;[state.totalPrice, state.totalItems] = changeCartTotal(state)
      }
    },
    deleteItems(state) {
      if (!state.items.length) return
      const areYouSure = window.confirm('Вы действительно хотите удальить всё из корзины?')
      if (areYouSure) {
        state.items = []
        state.totalItems = 0
        state.totalPrice = 0
      }
    },
  },
})

export const { reducer, actions } = cartSlice
