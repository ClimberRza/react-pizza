import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { actions as filterActions } from './Slices/filter.slice'
import { actions as cartActions } from './Slices/cart.slice'
import { fetchPizzas, actions as pizzaActions } from './Slices/pizza.slice'
import React from 'react'

const rootActions = {
  ...filterActions,
  ...cartActions,
  ...pizzaActions,
  fetchPizzas,
}

export function useActions() {
  const dispatch = useDispatch()
  return React.useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
