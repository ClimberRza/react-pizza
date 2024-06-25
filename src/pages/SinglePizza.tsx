import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const SinglePizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>()

  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchSinglePizza(id: string) {
      try {
        const response = await axios.get(`http://localhost:4000/pizzas/${id}`)
        setPizza(response.data)
      } catch (error) {
        alert('Произошла ошибка!')
        navigate('/pizzas')
      }
    }
    fetchSinglePizza(id ? id : '')
  }, [])

  if (!pizza) {
    return <h3>Загрузка...</h3>
  }
  return (
    <div>
      <img src={'/' + pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} ₽</p>
    </div>
  )
}

export default SinglePizza