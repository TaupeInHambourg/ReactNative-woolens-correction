import { Button, Image, ScrollView, StyleSheet } from 'react-native'
import TextInput from './inputs/TextInput'
import { useState } from 'react'
import { productValidator } from '../../utils/validators/validators'
import { TagsInput } from 'react-native-element-textinput'

function AddProductForm ({ onSubmit, initialValues }) {
  const [product, setProduct] = useState({
    image: initialValues?.image || null,
    name: initialValues?.title || '',
    short_description: initialValues?.description || '',
    keywords: initialValues?.keywords || [],
    price: initialValues?.price || 0
  })
  const [errors, setErrors] = useState(null)

  const handlePress = () => {
    const errors = productValidator(product)
    if (!errors.name && !errors.price && !errors.short_description) {
      onSubmit(product)
    } else {
      setErrors(errors)
    }
  }

  const handleChange = (field, value) => {
    setProduct({
      ...product,
      [field]: value
    })
    setErrors({
      ...errors,
      [field]: null
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        product.image && (
          <Image
            source={{ uri: product.image }}
            style={{ width: '100%', height: 400 }}
          />
        )
      }
      <TextInput
        value={product.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder='Nom du produit'
        error={errors?.name}
      />
      <TagsInput
        data={product.keywords}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        tagsStyle={styles.tagsStyle}
        tagsTextStyle={styles.tagsTextStyle}
        label='TagsInput'
        placeholder='Tags...'
        placeholderTextColor='gray'
        onChangeValue={value => {
          setProduct({
            ...product,
            keywords: value
          })
        }}
      />
      <TextInput
        keyboardType='number-pad'
        value={product.price.toString()}
        onChangeText={(text) => handleChange('price', text)}
        placeholder='Prix'
        error={errors?.price}
      />
      <TextInput
        textarea
        value={product.short_description}
        onChangeText={(text) => handleChange('short_description', text)}
        placeholder='Description courte'
        error={errors?.short_description}
      />
      <Button
        title='Ajouter le produit'
        onPress={handlePress}
      />
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 15,
    paddingVertical: 30,
    paddingHorizontal: 15
  },
  input: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  inputStyle: {
    fontSize: 16,
    minWidth: 80
  },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4
  },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  tagsStyle: {
    borderWidth: 0,
    borderRadius: 16,
    padding: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  tagsTextStyle: {
    fontSize: 16
  }
})

export default AddProductForm
