import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface FilterInitial {
  activeSort: 'rating' | 'title' | 'price'
  sortDirection: 'desc' | 'asc'
  activeCategorie: number
  currentPage: number
  searchPizza: string
}

export interface QueryParams {
  sort: 'rating' | 'title' | 'price'
  order: 'desc' | 'asc'
  page: string
  category_eq: string
}


export const initialState: FilterInitial = {
  activeSort: 'rating',
  sortDirection: 'desc',
  activeCategorie: 0,
  currentPage: 1,
  searchPizza: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeActiveSort(state, action: PayloadAction<'rating' | 'title' | 'price'>) {
      state.activeSort = action.payload
    },
    changeSortDirection(state, action: PayloadAction<'desc' | 'asc'>) {
      state.sortDirection = action.payload
    },
    changeActiveCategorie(state, action: PayloadAction<number>) {
      state.activeCategorie = action.payload
    },
    changeSearchPizza(state, action: PayloadAction<string>) {
      state.searchPizza = action.payload
    },
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.activeSort = action.payload.sort
      state.sortDirection = action.payload.order
      state.currentPage = Number(action.payload.page)
      if (action.payload.category_eq) {
        state.activeCategorie = Number(action.payload.category_eq)
      }
    },
  },
})

export const { reducer, actions } = filterSlice
