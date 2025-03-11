import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function AddProductScreen () {
  const [name, setName] = useState('')
  console.log(name)
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder='Nom du produit'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#222'
  }
})

export default AddProductScreen
