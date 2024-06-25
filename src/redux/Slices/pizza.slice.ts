import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { FilterInitial } from './filter.slice'

export interface Pizza {
  id: string
  imageUrl: string
  title: string
  types: (0 | 1)[]
  sizes: (26 | 30 | 40)[]
  price: string
  category: string
  rating: number
}

interface PizzaInitial {
  items: Pizza[]
  error: boolean
  isLoading: boolean
  pagesCount: number
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetch-pizzas',
  async ({ activeSort, activeCategorie, sortDirection, searchPizza, currentPage }: FilterInitial, thunkApi) => {
    try {
      const sortParam = 'sort=' + activeSort
      const categoryParam = activeCategorie > 0 ? '&category_eq=' + activeCategorie : ''
      const directionParam = '&order=' + sortDirection
      const searchParam = '&search=' + searchPizza
      const limitParam = '&limit=8'
      const pageParam = '&page=' + String(currentPage)
      const response = await axios.get<Pizza[]>(
        `http://localhost:4000/pizzas${
          '/?' + sortParam + categoryParam + directionParam + searchParam + limitParam + pageParam
        }`,
      )
      const pagesCount = Math.ceil(response.headers['x-total-count'] / 8)
      const resultResponse: {
        data: Pizza[]
        pages: number
      } = { data: response.data, pages: pagesCount }
      return resultResponse
    } catch (e) {
      return thunkApi.rejectWithValue('')
    }
  },
)

const initialState: PizzaInitial = {
  items: [],
  error: false,
  isLoading: true,
  pagesCount: 0,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoading = true
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.data
        state.pagesCount = action.payload.pages
        state.isLoading = false
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.error = true
        state.isLoading = false
        state.items = []
      })
  },
})

export const { reducer, actions } = pizzaSlice
