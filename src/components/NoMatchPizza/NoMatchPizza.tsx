import React from 'react'
import cls from './NoMatchPizza.module.scss'

const NoMatchPizza: React.FC = () => {
  return (
    <div>
      <h2 className={cls.noMatch}>
        Не найдено ни одной пиццы по вашеуму запросу <span className={cls.face}>😕</span>
      </h2>
    </div>
  )
}

export default NoMatchPizza