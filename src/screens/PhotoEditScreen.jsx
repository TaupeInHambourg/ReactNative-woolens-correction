import Icon from '@react-native-vector-icons/material-design-icons'
import { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { removeBackgroundFromImage } from '../adapters/photoroomAdapter'

function PhotoEditScreen ({ route, navigation }) {
  const { photo } = route.params

  const [image, setImage] = useState('file://' + photo.path)

  const handleRemoveBackground = async () => {
    const result = await removeBackgroundFromImage(photo.path)
    console.log(result)
    setImage(result)
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
        <TouchableOpacity style={styles.button} onPress={handleRemoveBackground}>
          <Icon name='checkerboard-remove' size={30} />
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
    padding: 10
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
