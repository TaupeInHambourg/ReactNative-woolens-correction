import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from '@react-native-vector-icons/material-design-icons'
import { describeImage } from '../adapters/geminiAdapter'
import { useState } from 'react'

function ImageDescriptionScreen ({ route, navigation }) {
  const { photo } = route.params
  const [loading, setLoading] = useState(false)

  const handleDescribeImage = async () => {
    setLoading(true)
    const result = await describeImage(photo)
    console.log('DESCRIBE RESULT', result)
    setLoading(false)
    navigation.navigate('Products', {
      screen: 'AddProduct',
      params: {
        product: result,
        photo
      }
    })
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo }}
        width='100%'
        height='100%'
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name='chevron-left' size={40} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDescribeImage}
          disabled={loading}
        >
          {
            loading
              ? <ActivityIndicator size={40} color='black' />
              : <Icon name='image-search-outline' size={40} />
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
  },
  buttonContainer: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
    padding: 20
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
    padding: 10
  }
})

export default ImageDescriptionScreen
