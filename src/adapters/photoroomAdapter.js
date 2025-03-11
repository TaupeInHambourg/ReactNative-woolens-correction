import axios from 'axios'

const API_KEY = 'YOUR_API_KEY'

const api = axios.create({
  baseURL: 'https://image-api.photoroom.com/v2',
  headers: {
    Accept: 'image/png, application/json',
    'Content-Type': 'multipart/form-data;',
    'x-api-key': API_KEY
  }
})

const removeBackgroundFromImage = async (imageURI) => {
  try {
    console.log(imageURI)
    const form = new FormData()
    form.append('imageFile', imageURI)
    form.append('shadow.mode', 'ai.soft')
    form.append('background.color', 'FFFFFF')
    form.append('padding', '0.1')

    const response = await api.post('/edit', form)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  removeBackgroundFromImage
}
