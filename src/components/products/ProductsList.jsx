import { useCallback, useState } from 'react'
import { Alert, FlatList, RefreshControl, Text } from 'react-native'
import ProductsListItem from './ProductsListItem'
import ProductModal from './ProductModal'

function ProductsList ({ products, onDelete, onUpdate, onRefresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const onRefreshList = useCallback(async () => {
    setRefreshing(true)
    await onRefresh()
    setRefreshing(false)
  }, [])

  if (!products || products.length < 1) return <Text>No data</Text>

  const handleDelete = (product) => {
    Alert.alert(
      'Confirmation',
      `Voulez-vous vraiment supprimer ${product.name} ?`,
      [
        {
          text: 'Annuler',
          onPress: () => console.log('cancel')
        },
        {
          text: 'Supprimer',
          style: 'cancel',
          onPress: () => {
            onDelete(product)
            setIsModalOpen(false)
          }
        }
      ],
      { cancelable: true }
    )
  }

  const handleLongPress = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <>
      <FlatList
        initialNumToRender={30}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshList} />
        }
        data={products}
        renderItem={
            ({ item, index, separators }) => (
              <ProductsListItem
                key={index}
                product={item}
                onLongPress={handleLongPress}
              />
            )
          }
      />
      <ProductModal
        onDelete={handleDelete}
        onUpdate={onUpdate}
        product={selectedProduct}
        modalVisible={isModalOpen}
        setModalVisible={setIsModalOpen}
      />
    </>
  )
}

export default ProductsList
