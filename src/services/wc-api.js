import axios from 'axios'
import Config from 'react-native-config'
import { Notifier, NotifierComponents } from 'react-native-notifier'
import { encode as base64Encode } from 'base-64'

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

/**
 * Upload l'image en base64 dans la médiathèque WordPress.
 * Ici, au lieu de créer un Blob, on utilise directement un objet fichier avec une uri de type data URL.
 *
 * @param {string} base64Image - La data URL de l'image (ex : "data:image/jpeg;base64,...")
 * @returns {Promise<Object>} La réponse JSON de l'upload (contenant notamment source_url)
 */
const uploadMedia = async (base64Image) => {
  try {
    // Vérifie que la data URL commence bien par "data:image/jpeg;base64,"
    let imageUri = base64Image
    if (!base64Image.startsWith('data:image')) {
      // Si ce n'est pas le cas, on ajoute le préfixe (à adapter si ton image est d'un autre type)
      imageUri = `data:image/jpeg;base64,${base64Image}`
    }

    // Créer un objet fichier pour FormData
    const imageFile = {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg'
    }

    // Préparer le FormData
    const formData = new FormData()
    formData.append('file', imageFile)

    // Encodage des identifiants en Basic Auth
    const authString = `${Config.WC_CLIENT_KEY}:${Config.WC_SECRET_KEY}`
    const base64Auth = base64Encode(authString)

    const uploadResponse = await fetch(Config.WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Disposition': 'attachment; filename="image.jpg"',
        // Ne pas définir manuellement Content-Type, fetch le fera automatiquement pour FormData.
        Authorization: `Basic ${base64Auth}`
      },
      body: formData
    })

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      throw new Error(`Erreur d'upload de l'image : ${uploadResponse.status} - ${errorText}`)
    }
    return await uploadResponse.json()
  } catch (error) {
    console.error(error)
    Notifier.showNotification({
      title: "Erreur d'upload d'image",
      description: `L'image n'a pas pu être uploadée : ${error}`,
      Component: NotifierComponents.Alert,
      componentProps: { alertType: 'error' }
    })
    throw error
  }
}

/**
 * Crée un produit WooCommerce avec une image.
 * Le produit doit inclure une propriété "image" contenant la data URL (base64) de l'image.
 *
 * @param {Object} product - Objet contenant name, short_description, price et image (base64)
 * @returns {Promise<Object>} Le produit créé
 */
const addProductWithImageApi = async (product) => {
  try {
    // 1. Upload de l'image et récupération de son URL
    const mediaResponse = await uploadMedia(product.image)
    const imageUrl = mediaResponse.source_url

    // 2. Prépare les données du produit en intégrant l'image
    const data = {
      name: product.name,
      short_description: product.short_description,
      regular_price: product.price.toString(),
      tags: product.keywords.map((keyword) => ({
        name: keyword
      })),
      images: [
        {
          src: imageUrl
        }
      ]
    }

    // Création du produit via l'API WooCommerce
    const response = await api.post('/products', data)
    Notifier.showNotification({
      title: "Le produit a bien été ajouté avec l'image",
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    Notifier.showNotification({
      title: "Le produit n'a pas été ajouté",
      description: `Erreur lors de la création du produit : ${error}`,
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
      regular_price: product.price
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
  deleteProduct,
  addProductWithImageApi,
  uploadMedia
}
