import { StyleSheet, View } from 'react-native'
import AddProductForm from '../components/form/AddProductForm'
import { addProduct } from '../services/wc-api'

function AddProductScreen ({ navigation }) {
  const handleSubmit = async (product) => {
    const result = await addProduct(product)
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
