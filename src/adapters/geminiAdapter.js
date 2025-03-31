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

const useFetch = () => {
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
                    parts: [{ text: 'Add a title to this image' }]
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
  useFetch
}
