import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import NoCameraErrorView from './NoCameraErrorView'
import PermissionPage from './PermissionPage'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from '@react-native-vector-icons/material-design-icons'
import { useRef } from 'react'

function CameraComponent ({ navigation }) {
  const camera = useRef(null)
  const device = useCameraDevice('back')

  const { hasPermission } = useCameraPermission()

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto()
    navigation.navigate('PhotoEdit', {
      photo
    })
  }

  if (!hasPermission) return <PermissionPage />
  if (device === null) return <NoCameraErrorView />

  return device && (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        photo
        photoHdr
        isActive
      />
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Icon name='camera-outline' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30
  },
  photoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
    padding: 20
  }
})

export default CameraComponent
