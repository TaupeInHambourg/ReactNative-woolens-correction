import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CameraScreen from '../screens/CameraScreen'
import PhotoEditScreen from '../screens/PhotoEditScreen'

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
    </Stack.Navigator>
  )
}

export default CameraNavigator
