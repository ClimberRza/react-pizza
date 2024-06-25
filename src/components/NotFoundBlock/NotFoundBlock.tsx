import React from 'react'
import cls from './styles.module.scss'

const NotFoundBlock: React.FC = () => {
    return (
        <>
            <span className={cls.face}>😕</span>
            <br />
            <h1>Произошла ошибка</h1>
            <p>Страницы по данному адресу не существует.</p>
        </>
    )
}

export default NotFoundBlock
