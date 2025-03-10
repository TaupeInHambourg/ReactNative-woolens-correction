import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { getAllProducts } from '../services/wc-api'

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
      <Text>Products Screen</Text>
      <Text>{JSON.stringify(products, null, 2)}</Text>
    </View>
  )
}

export default ProductsScreen
