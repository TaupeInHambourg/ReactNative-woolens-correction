import Icon from '@react-native-vector-icons/material-design-icons'
import { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { removeBackgroundFromImage } from '../adapters/photoroomAdapter'

function PhotoEditScreen ({ route, navigation }) {
  const [loading, setLoading] = useState(false)
  const { photo } = route.params

  const [image, setImage] = useState('file://' + photo.path)

  const handleRemoveBackground = async () => {
    setLoading(true)
    const result = await removeBackgroundFromImage(photo.path)
    setImage(result)
    setLoading(false)
  }

  return photo && (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        width='100%'
        height='100%'
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name='chevron-left' size={40} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRemoveBackground}
          disabled={loading}
        >
          {
            loading
              ? <ActivityIndicator size={40} color='black' />
              : <Icon name='checkerboard-remove' size={40} />
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

export default PhotoEditScreen
