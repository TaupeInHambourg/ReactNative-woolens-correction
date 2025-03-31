import { useEffect, useState } from 'react'
import {
  getAllProducts,
  deleteProduct as deleteProductApi,
  addProduct as addProductApi,
  addProductWithImageApi
} from '../services/wc-api'

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

  const deleteProduct = async (productId) => {
    setIsLoading(true)
    await deleteProductApi(productId)
    await getData()
    setIsLoading(false)
  }

  const addProduct = async (product) => {
    setIsLoading(true)
    await addProductApi(product)
    await getData()
    setIsLoading(false)
  }

  const addProductWithImage = async (product) => {
    setIsLoading(true)
    await addProductWithImageApi(product)
    await getData()
    setIsLoading(false)
  }

  const refresh = async () => {
    const data = await getAllProducts()
    if (data) {
      setProducts(data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    isLoading,
    refresh,
    deleteProduct,
    addProduct,
    addProductWithImage,
    products
    // error
  }
}

export default useProducts
