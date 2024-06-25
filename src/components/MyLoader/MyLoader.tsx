import { ComponentType } from 'react'
import cls from './MyLoader.module.scss'

const MyLoader: React.FC = () => {
  return (
    <div className={cls.myLoader}>
      <div className={cls.circle}></div>
    </div>
  )
}

export default MyLoader
