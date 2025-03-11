import { ActivityIndicator, StyleSheet, View } from 'react-native'

function DataLoader () {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default DataLoader
