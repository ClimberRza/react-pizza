import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Parent: React.FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Parent
