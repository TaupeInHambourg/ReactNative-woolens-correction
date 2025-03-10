import { ScrollView, Text } from 'react-native'
import ProductsListItem from './ProductsListItem'
import { productsListStyle as styles } from './ProductsListStyle'

function ProductsList ({ products }) {
  if (!products || products.length < 1) return <Text>No data</Text>

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        products.map(product =>
          <ProductsListItem key={product.id} product={product} />
        )
      }
    </ScrollView>
  )
}

export default ProductsList
