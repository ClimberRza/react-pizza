import { FilterInitial } from '../redux/Slices/filter.slice'

export function stateHasParams(params: qs.ParsedQs, state: Omit<FilterInitial, 'searchPizza'>) {
  for (let i = 0; i <= 3; i++) {
    const stateValue = state[(Object.keys(state) as Array<keyof Omit<FilterInitial, 'searchPizza'>>)[i]]
    const paramValue = params[Object.keys(params)[i]]
    if (String(stateValue) !== String(paramValue) && paramValue) {
      return false
    }
  }
  return true
}
