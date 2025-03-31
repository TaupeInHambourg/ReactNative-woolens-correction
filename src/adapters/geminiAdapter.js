import { GoogleGenerativeAI } from '@google/generative-ai'
import Config from 'react-native-config'
// import fs from 'fs'

const genAI = new GoogleGenerativeAI(Config.GEMINI_API_KEY)

// Converts local file information to base64
// function fileToGenerativePart (path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString('base64'),
//       mimeType
//     }
//   }
// }

const describeImage = async (base64Image) => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: 'application/json' }
    })

    const parts = [
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

    const generatedContent = await model.generateContent(parts)
    const result = generatedContent.response.text()
    const jsonResponse = JSON.parse(result)
    console.log('Réponse de l\'API:', jsonResponse)
    return jsonResponse
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error)
  }
}

export {
  describeImage
}
