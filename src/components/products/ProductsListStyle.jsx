import { StyleSheet } from 'react-native'

export const productsListStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    gap: 10
  }
})

export const productsListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    gap: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column'
  }
})
