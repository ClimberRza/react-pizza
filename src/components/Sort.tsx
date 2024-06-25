import React from 'react'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'
import { useActions } from '../redux/useActions'
import { useTypedSelector } from '../redux/useTypesSelector'

type optionsStrings = 'rating' | 'price' | 'title'

const options: optionsStrings[] = ['rating', 'price', 'title']

const uiOptions = {
  rating: 'популярности',
  price: 'цене',
  title: 'алфавиту',
}

const Sort: React.FC = React.memo(() => {
  const [showOptions, setShowOptions] = React.useState(false)
  const sortRef = React.useRef<HTMLDivElement>(null)
  const { changeSortDirection, changeActiveSort } = useActions()
  const { sortDirection, activeSort } = useTypedSelector((state) => state.filter)

  React.useEffect(() => {
    const hideOptions = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setShowOptions(false)
      }
    }
    document.body.addEventListener('click', hideOptions)
    return () => {
      document.body.removeEventListener('click', hideOptions)
    }
  }, [])

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          onClick={() => setShowOptions(!showOptions)}
          className={showOptions ? 'open' : ''}
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>

        <span onClick={() => setShowOptions(!showOptions)}>{uiOptions[activeSort]}</span>
        {sortDirection === 'asc' ? (
          <FaArrowTrendUp className="arrow" onClick={() => changeSortDirection('desc')} />
        ) : (
          <FaArrowTrendDown className="arrow" onClick={() => changeSortDirection('asc')} />
        )}
      </div>
      <div className={showOptions ? 'sort__popup open' : 'sort__popup'}>
        <ul>
          {options.map((opt, id) => (
            <li
              key={id}
              onClick={() => {
                setShowOptions(false)
                changeActiveSort(opt)
              }}
              className={opt === activeSort ? 'active' : ''}>
              {uiOptions[opt]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default Sort
