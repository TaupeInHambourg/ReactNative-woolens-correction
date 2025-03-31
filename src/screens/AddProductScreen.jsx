import { StyleSheet, View } from 'react-native'
import AddProductForm from '../components/form/AddProductForm'
import useProducts from '../hooks/useProducts'

function AddProductScreen ({ navigation, route }) {
  const { addProduct } = useProducts()

  const { product, image } = route.params || {}

  const initialValues = {
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: image || null
  }

  const handleSubmit = async (product) => {
    await addProduct(product)
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
