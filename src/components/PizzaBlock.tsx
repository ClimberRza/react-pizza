import React from 'react'
import { useActions } from '../redux/useActions'
import { useNavigate } from 'react-router-dom'
import { Pizza } from '../redux/Slices/pizza.slice'
import { useTypedSelector } from '../redux/useTypesSelector'

const uiTypes: ('Тонкое' | 'Традиционное')[] = ['Тонкое', 'Традиционное']

const PizzaBlock: React.FC<Pizza> = ({ id, imageUrl, price, rating, sizes, types, title }) => {
  const { addItem } = useActions()
  const { items } = useTypedSelector((state) => state.cart)
  const [testo, setTesto] = React.useState(types[0])
  const [diametr, setDiametr] = React.useState<26 | 30 | 40>(sizes[0])
  const [pizzaNum, setPizzaNum] = React.useState(0)

  const navigate = useNavigate()

  React.useEffect(() => {
    let initialForPizzaNum = 0
    let exactPizza = items.find((item) => +item.id === +id)
    if (exactPizza) {
      initialForPizzaNum = +exactPizza['count']
    }
    setPizzaNum(initialForPizzaNum)
  }, [])

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">
        {title}
        {<img className="pizza-block__title__star" src="/img/star.png" alt="star" />}
        <span>{rating}</span>
      </h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li key={index} className={type === testo ? 'active' : ''} onClick={() => setTesto(type)}>
              {uiTypes[type]}
            </li>
          ))}
          {}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li key={index} className={diametr === size ? 'active' : ''} onClick={() => setDiametr(size)}>
              {size} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={() => {
            setPizzaNum(pizzaNum + 1)
            addItem({ id: +id, title, price: +price, imageUrl, size: diametr, type: uiTypes[testo] })
          }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{pizzaNum}</i>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
