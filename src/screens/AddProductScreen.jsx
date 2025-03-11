import { StyleSheet, View } from 'react-native'
import AddProductForm from '../components/form/AddProductForm'

function AddProductScreen () {
  const handleSubmit = () => {

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
