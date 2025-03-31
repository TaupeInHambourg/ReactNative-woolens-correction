import axios from 'axios'
import { useState } from 'react'
import Config from 'react-native-config'

const addName = async (imageURI) => {
  const options = {
    method: 'POST',
    headers: {
      key: Config.GEMINI_API_KEY,
      'Content-Type': 'application/json'
    }
  }
}

const describeImage = (base64Image) => {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState < string | null > (null)
  const fetchGemini = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${Config.GEMINI_API_URL}?key=${Config.GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image.split(',')[1] // Remove the data URL prefix
                }
              },
              `Je veux décrire ce produit en Français à destination d' un site e-commerce. 
              Je veux que tu me donnes une description détaillée du produit, en incluant des informations sur ses caractéristiques, ses avantages et son utilisation. 
              Je veux également que tu me donnes des mots-clés pertinents pour le référencement. Limite le nombre de mots-clés à 5 : les plus pertinants.
              Je veux aussi une catégorie appropriée pour le produit.
              Essaye d'évaluer le prix du produit: Donne moi juste le montant, sans la devise.
              Le format attendu de réponse est le suivant : 
              { 
                "title": "TITRE_DU_PRODUIT", 
                "description": "DESCRIPTION_DU_PRODUIT",
                "keywords": ["MOT_CLE_1", "MOT_CLE_2", ...],
                "category": "CATEGORIE_DU_PRODUIT",
                "price": "PRIX_DU_PRODUIT"
              }
              Fais bien attention à supprimer les filigranes qui pourraient être présents sur l'image au préalable.`
            ]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setResponse(res.data.candidates[0]?.content?.parts[0]?.text || 'No response')
      setLoading(false)
      console.log('API Response:', JSON.stringify(res.data, null, 2))
    } catch (err) {
      setError('Error fetching response')
      setLoading(false)
      console.log(err)
    }
  }

  return { fetchGemini, loading, error, response }
}

export {
  describeImage
}
