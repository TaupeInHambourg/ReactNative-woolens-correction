import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CameraScreen from '../screens/CameraScreen'
import PhotoEditScreen from '../screens/PhotoEditScreen'
import ImageDescriptionScreen from '../screens/ImageDescriptionScreen'

const Stack = createNativeStackNavigator()

function CameraNavigator () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Camera' component={CameraScreen} />
      <Stack.Screen name='PhotoEdit' component={PhotoEditScreen} />
      <Stack.Screen name='ImageDescription' component={ImageDescriptionScreen} />
    </Stack.Navigator>
  )
}

export default CameraNavigator
