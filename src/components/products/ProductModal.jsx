import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

function ProductModal ({
  product,
  setModalVisible,
  modalVisible,
  onDelete,
  onUpdate
}) {
  return (
    <Modal
      animationType='slide'
      backdropColor='rgba(34, 34, 34, 0.7)'
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{`Produit ${product?.name}`}</Text>
          <Button
            title='Editer le produit'
            onPress={() => onUpdate(product)}
          />
          <Button
            color='red'
            title='Supprimer le produit'
            onPress={() => onDelete(product)}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
          >
            <Text>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    gap: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 20,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default ProductModal
