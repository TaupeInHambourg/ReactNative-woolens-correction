import axios from 'axios'
import Config from 'react-native-config'
import { Notifier, NotifierComponents } from 'react-native-notifier'

const api = axios.create({
  baseURL: Config.WC_API_URL,
  auth: {
    username: Config.WC_CLIENT_KEY,
    password: Config.WC_SECRET_KEY
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 10000
})

const getAllProducts = async () => {
  try {
    const response = await api.get('/products?per_page=30')
    return response.data
  } catch (error) {
    console.error(error)
    Notifier.showNotification({
      title: 'Une erreur erreur s\'est produite',
      description: `Erreur réseau, vérifiez votre connexion internet\n${error}`,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error'
      }
    })
  }
}

const addProduct = async (product) => {
  try {
    const data = {
      name: product.name,
      short_description: product.short_description,
      price: parseFloat(product.price)
    }
    const response = await api.post('/products', data)
    Notifier.showNotification({
      title: 'Le produit a bien été ajouté',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    Notifier.showNotification({
      title: 'Le produit n\'a pas été ajouté',
      description: `Une erreur s'est produite \n${error}`,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error'
      }
    })
  }
}

const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`)
    Notifier.showNotification({
      title: 'Le produit a bien été supprimé',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    Notifier.showNotification({
      title: 'Le produit n\'a pas été supprimé',
      description: `Une erreur s'est produite \n${error}`,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'error'
      }
    })
  }
}

export {
  getAllProducts,
  addProduct,
  deleteProduct
}
