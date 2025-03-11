import { View } from 'react-native'
import ProductsList from '../components/products/ProductsList'
import Fab from '../components/Fab'
import useProducts from '../hooks/useProducts'
import DataLoader from '../components/loader/DataLoader'

function ProductsScreen ({ navigation }) {
  const { products, isLoading } = useProducts()

  const handlePress = () => {
    navigation.navigate('AddProduct')
  }

  if (isLoading) {
    return <DataLoader />
  }

  return (
    <View>
      <ProductsList products={products} />
      <Fab onPress={handlePress} />
    </View>
  )
}

export default ProductsScreen
