import React, { useMemo } from 'react'
import cls from './Pagination.module.scss'
import { useActions } from '../../redux/useActions'
import { useTypedSelector } from '../../redux/useTypesSelector'

interface PaginationProps {
  pagesCount: number
}

const Pagination: React.FC<PaginationProps> = ({ pagesCount }) => {
  const { currentPage } = useTypedSelector((state) => state.filter)
  const { changeCurrentPage } = useActions()

  const arr = useMemo(() => {
    const res = []
    for (let i = 1; i <= pagesCount; i++) {
      res.push(i)
    }
    return res
  }, [pagesCount])

  return (
    <div className={cls.pagination}>
      {arr.map((elem) => (
        <span
          className={cls.pageChanger + (currentPage === elem ? ` ${cls.active}` : '')}
          onClick={() => changeCurrentPage(elem)}
          key={elem}>
          {elem}
        </span>
      ))}
    </div>
  )
}

export default Pagination
