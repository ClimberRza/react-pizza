import qs from 'qs'
import { FilterInitial } from '../redux/Slices/filter.slice'

export default function createQS({
  activeSort,
  sortDirection,
  currentPage,
  activeCategorie,
}: Omit<FilterInitial, 'searchPizza'>) {
  const obj: {
    sort: 'rating' | 'title' | 'price'
    order: 'desc' | 'asc'
    page: number
    category_eq?: number
  } = {
    sort: activeSort,
    order: sortDirection,
    page: currentPage,
  }
  if (activeCategorie > 0) {
    obj.category_eq = activeCategorie
  }
  const queryString = qs.stringify(obj)
  return queryString
}
