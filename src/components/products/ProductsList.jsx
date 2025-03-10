import { ScrollView, Text } from 'react-native'
import ProductsListItem from './ProductsListItem'

function ProductsList ({ products }) {
  if (!products || products.length < 1) return <Text>No data</Text>

  return (
    <ScrollView>
      {
        products.map(product =>
          <ProductsListItem key={product.id} product={product} />
        )
      }
    </ScrollView>
  )
}

export default ProductsList
