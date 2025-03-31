import { encode as base64Encode } from 'base-64'

const API_KEY = 'sandbox_ab0964e7b6e82c9a11eb317ded4451d6fcc36229'

const removeBackgroundFromImage = async (imageURI) => {
  try {
    const form = new FormData()
    // Vérifie que l'URI commence par "file://"
    const fileURI = imageURI.startsWith('file://') ? imageURI : 'file://' + imageURI
    form.append('imageFile', {
      uri: fileURI,
      type: 'image/jpeg',
      name: 'image.jpg'
    })
    form.append('shadow.mode', 'ai.soft')
    form.append('background.color', 'FFFFFF')
    form.append('padding', '0.1')

    const options = {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY
        // Laisse fetch gérer le Content-Type pour multipart/form-data
      },
      body: form
    }

    const response = await fetch('https://image-api.photoroom.com/v2/edit', options)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`)
    }
    // Récupère la réponse sous forme d'arrayBuffer
    const arrayBuffer = await response.arrayBuffer()

    // Fonction pour convertir l'arrayBuffer en base64
    const arrayBufferToBase64 = (buffer) => {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return base64Encode(binary)
    }

    const base64 = arrayBufferToBase64(arrayBuffer)
    const dataUrl = `data:image/jpeg;base64,${base64}`
    // console.log('Image en base64:', dataUrl)
    return dataUrl
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error)
    throw error
  }
}

export {
  removeBackgroundFromImage
}
