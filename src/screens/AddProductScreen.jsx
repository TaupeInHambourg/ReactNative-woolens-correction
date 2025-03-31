import { StyleSheet, View } from 'react-native'
import AddProductForm from '../components/form/AddProductForm'
import useProducts from '../hooks/useProducts'

function AddProductScreen ({ navigation, route }) {
  const { addProductWithImage } = useProducts()

  const { product, image } = route.params || {}

  const initialValues = {
    title: product?.title || product?.name || '',
    description: product?.description || product?.short_description || '',
    price: product?.price || 0,
    keywords: product?.keywords || product?.tags?.map(t => t.name) || [],
    image: image || product?.images[0]?.src || null
  }

  const handleSubmit = async (product) => {
    await addProductWithImage(product)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <AddProductForm
        initialValues={initialValues}
        onCancel={() => navigation.goBack()}
        onSubmit={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

export default AddProductScreen
