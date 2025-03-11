import { Image, Text, TouchableOpacity, View } from 'react-native'
import { productsListItemStyle as styles } from './ProductsListStyle'

function ProductsListItem ({ product, onLongPress }) {
  return (
    <TouchableOpacity style={styles.container} onLongPress={() => onLongPress(product)}>
      <Image
        src={product?.images[0]?.src}
        width={100}
        height={100}
      />
      <View style={styles.textContainer}>
        <Text>{product.name}</Text>
        <Text>{product.short_description}</Text>
        <Text>
          {Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(product.price)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductsListItem
