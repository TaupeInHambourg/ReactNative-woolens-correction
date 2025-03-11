import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsScreen from '../screens/ProductsScreen'
import AddProductScreen from '../screens/AddProductScreen'

const Stack = createNativeStackNavigator()

function ProductsNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Products' component={ProductsScreen} />
      <Stack.Screen name='AddProduct' component={AddProductScreen} />
    </Stack.Navigator>
  )
}

export default ProductsNavigator
