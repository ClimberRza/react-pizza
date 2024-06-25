import React from 'react'
import cls from '../components/NotFoundBlock/styles.module.scss'
import NotFoundBlock from '../components/NotFoundBlock/NotFoundBlock'

const NotFound: React.FC = () => {
    return (
        <div className={cls.notFound}>
            <NotFoundBlock />
        </div>
    )
}

export default NotFound
