import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as filterReducer } from './Slices/filter.slice'
import { reducer as cartReducer } from './Slices/cart.slice'
import { reducer as pizzaReducer } from './Slices/pizza.slice'

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  pizza: pizzaReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store['getState']>

export default store