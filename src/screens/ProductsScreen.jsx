import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { getAllProducts } from '../services/wc-api'
import ProductsList from '../components/products/ProductsList'
import Fab from '../components/Fab'

function ProductsScreen ({ navigation }) {
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

  const handlePress = () => {
    navigation.navigate('AddProduct')
  }

  return (
    <View>
      <ProductsList products={products} />
      <Fab onPress={handlePress} />
    </View>
  )
}

export default ProductsScreen
