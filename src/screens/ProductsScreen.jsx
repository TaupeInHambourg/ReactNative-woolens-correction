import { View } from 'react-native'
import ProductsList from '../components/products/ProductsList'
import Fab from '../components/Fab'
import useProducts from '../hooks/useProducts'
import DataLoader from '../components/loader/DataLoader'
import { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

function ProductsScreen ({ navigation }) {
  const { products, isLoading, deleteProduct, refresh } = useProducts()
  const isFocused = useIsFocused()

  useEffect(() => {
    refresh()
  }, [isFocused])

  const handlePress = () => {
    navigation.navigate('AddProduct')
  }

  const handleDelete = async (product) => {
    await deleteProduct(product.id)
  }

  if (isLoading) {
    return <DataLoader />
  }

  return (
    <View>
      <ProductsList
        products={products}
        onDelete={handleDelete}
        onRefresh={refresh}
      />
      <Fab onPress={handlePress} />
    </View>
  )
}

export default ProductsScreen
