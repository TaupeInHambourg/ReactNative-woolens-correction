import { StyleSheet, Text, View } from 'react-native'

function NoCameraErrorView () {
  return (
    <View style={styles.container}>
      <Text>Pas de caméra détectée</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default NoCameraErrorView
