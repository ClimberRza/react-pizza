import React from 'react'
import { useActions } from '../redux/useActions'
import { RootState } from '../redux/store'
import { useTypedSelector } from '../redux/useTypesSelector'
const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Сладкие']

const Categories: React.FC = () => {
  const { activeCategorie } = useTypedSelector((state) => state.filter)
  const { changeActiveCategorie, changeCurrentPage } = useActions()
  return (
    <>
      {categories.map((elem, index) => {
        const classes = ['categorie']
        if (activeCategorie === index) {
          classes.push('active')
        }
        return (
          <div
            key={index}
            className={classes.join(' ')}
            onClick={() => {
              changeCurrentPage(1)
              changeActiveCategorie(index)
            }}>
            {elem}
          </div>
        )
      })}
    </>
  )
}

export default Categories
