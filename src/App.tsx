import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import './scss/app.scss'
import Parent from './pages/Parent'
import MyLoader from './components/MyLoader/MyLoader'
import Home from './pages/Home'

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <MyLoader />,
})

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
  loading: () => <MyLoader />,
})

function App() {
  return (
    <Routes>
      <Route path="/" element={<Parent />}>
        <Route index element={<Home />} />
        <Route path="pizzas" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
