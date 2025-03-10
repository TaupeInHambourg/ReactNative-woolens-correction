import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { getAllProducts } from '../services/wc-api'
import ProductsList from '../components/products/ProductsList'

function ProductsScreen () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProducts()
      if (data) {
        setProducts(data)
      }
    }
    getData()
  }, [])

  return (
    <View>
      <ProductsList products={products} />
    </View>
  )
}

export default ProductsScreen
