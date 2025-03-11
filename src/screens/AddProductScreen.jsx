import { StyleSheet, View } from 'react-native'
import AddProductForm from '../components/form/AddProductForm'
import useProducts from '../hooks/useProducts'

function AddProductScreen ({ navigation }) {
  const { addProduct } = useProducts()

  const handleSubmit = async (product) => {
    await addProduct(product)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <AddProductForm
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
