import { useEffect, useState } from 'react'
import { getAllProducts } from '../services/wc-api'

function useProducts () {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)

  const getData = async () => {
    setIsLoading(true)
    const data = await getAllProducts()
    if (data) {
      setProducts(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    isLoading,
    refresh: getData,
    products
    // error
  }
}

export default useProducts
