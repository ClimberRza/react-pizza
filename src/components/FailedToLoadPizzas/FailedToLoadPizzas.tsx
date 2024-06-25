import React from 'react'
import cls from './FailedToLoad.module.scss'

const FailedToLoadPizzas: React.FC = () => {
  return (
    <div className={cls.parent}>
      <div className={cls.fail}>
        <h2>
          Ошибка при загрузке
          <span className={cls.face}>😕</span>
        </h2>
        <p>К сожалению, не удалось найти пиццы{'('} Повторите попытку через некоторое время.</p>
      </div>
    </div>
  )
}

export default FailedToLoadPizzas
