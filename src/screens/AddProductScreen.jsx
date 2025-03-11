import { StyleSheet, View } from 'react-native'
import AddProductForm from '../components/form/AddProductForm'

function AddProductScreen () {
  return (
    <View style={styles.container}>
      <AddProductForm />
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
