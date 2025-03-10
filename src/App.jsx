/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigation/MainNavigator'

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222222'
  }
}

function App () {
  return (
    <NavigationContainer theme={myTheme}>
      <MainNavigator />
    </NavigationContainer>
  )
}

export default App
