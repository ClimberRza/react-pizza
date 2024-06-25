import React from 'react'

import Sort from '../components/Sort'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import MyInput from '../components/MyInput/MyInput'
import Pagination from '../components/Pagination/Pagination'

import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { useActions } from '../redux/useActions'
import createQS from '../utils/createQS'
import { stateHasParams } from '../utils/stateHasParams'
import FailedToLoadPizzas from '../components/FailedToLoadPizzas/FailedToLoadPizzas'
import { useTypedSelector } from '../redux/useTypesSelector'
import NoMatchPizza from '../components/NoMatchPizza/NoMatchPizza'

const Home: React.FC = () => {
  const shouldSearch = React.useRef(true)
  const isMounted = React.useRef(false)
  const navigateTo = useNavigate()
  const { activeSort, sortDirection, activeCategorie, searchPizza, currentPage } = useTypedSelector(
    (state) => state.filter,
  )

  const {
    items: pizzas,
    error: pizzaError,
    isLoading: arePizzasLoading,
    pagesCount,
  } = useTypedSelector((state) => state.pizza)

  const { setFilters, fetchPizzas } = useActions()

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      if (!stateHasParams(params, { activeSort, sortDirection, currentPage, activeCategorie })) {
        setFilters(params)
        shouldSearch.current = false
      }
    }
  }, [])

  React.useEffect(() => {
    if (shouldSearch.current) {
      fetchPizzas({ activeSort, activeCategorie, sortDirection, searchPizza, currentPage })
    }
    shouldSearch.current = true
  }, [activeCategorie, activeSort, sortDirection, searchPizza, currentPage])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = createQS({ activeSort, sortDirection, currentPage, activeCategorie })
      navigateTo(`?${queryString}`)
    }
    isMounted.current = true
  }, [activeCategorie, activeSort, sortDirection, currentPage])

  function renderMainContent() {
    if (pizzaError) {
      return <FailedToLoadPizzas />
    }
    if (arePizzasLoading) {
      return (
        <div className="content__items">
          {[...Array(12)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )
    }
    if (pizzas.length === 0) {
      return <NoMatchPizza />
    }
    return (
      <div className="content__items">
        {pizzas.map((pizza) => (
          <PizzaBlock {...pizza} key={pizza.id} />
        ))}
      </div>
    )
  }

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
          <MyInput />
        </div>
        {renderMainContent()}
        <Pagination pagesCount={pagesCount} />
      </div>
    </div>
  )
}

export default Home
