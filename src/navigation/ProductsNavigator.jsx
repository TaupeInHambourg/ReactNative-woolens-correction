import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsScreen from '../screens/ProductsScreen'

const Stack = createNativeStackNavigator()

function ProductsNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Products' component={ProductsScreen} />
    </Stack.Navigator>
  )
}

export default ProductsNavigator
