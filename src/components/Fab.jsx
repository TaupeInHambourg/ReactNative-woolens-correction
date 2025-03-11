import Icon from '@react-native-vector-icons/material-design-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'

function Fab ({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name='plus' size={40} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 5,
    padding: 15,
    borderRadius: 50,
    bottom: 15,
    right: 15
  }
})

export default Fab
