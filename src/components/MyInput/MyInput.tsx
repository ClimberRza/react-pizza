import React, { ChangeEventHandler, MouseEventHandler } from 'react'

import cls from './MyInput.module.scss'

import { BsSearch } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { useActions } from '../../redux/useActions'
import debounce from 'lodash.debounce'

const MyInput: React.FC = () => {
  const { changeSearchPizza } = useActions()
  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)


  const updateSearchPizza = React.useCallback(
    debounce((str: string) => {
      changeSearchPizza(str)
    }, 400),
    [],
  )

  const onChangePizzaInp: ChangeEventHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchPizza(e.target.value)
  }, [])

  const onClickCross: MouseEventHandler = (e: React.MouseEvent<SVGSVGElement>) => { 
    changeSearchPizza('')
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={cls.inputBlock + ' content__top__input-block'}>
      <input
        ref={inputRef}
        value={value}
        placeholder="Найти пиццу..."
        onChange={onChangePizzaInp}
        className={cls.myInput}
      />
      {value && (
        <>
          <div className={cls.search}>
            <BsSearch />
          </div>
          <RxCross2 onClick={onClickCross} className={cls.cross} />
        </>
      )}
    </div>
  )
} 

export default MyInput
