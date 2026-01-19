import axios from 'axios'

const BACKEND_URL = '/api'
const SD_API_URL = 'http://127.0.0.1:7860'

class ImageGenerator {
  constructor() {
    this.isConnected = false
  }

  async checkConnection() {
    try {
      const response = await axios.get(`${BACKEND_URL}/check-sd`, {
        timeout: 5000
      })
      this.isConnected = response.data.connected
      return this.isConnected
    } catch (error) {
      console.error('Connection check failed:', error)
      this.isConnected = false
      return false
    }
  }

  async generateImage(prompt, options = {}) {
    try {
      const payload = {
        prompt: this.enhanceFashionPrompt(prompt),
        negative_prompt: options.negativePrompt ||
          'low quality, blurry, distorted, deformed, ugly, bad anatomy, bad proportions, watermark, text',
        steps: options.steps || 30,
        cfg_scale: options.cfgScale || 7.5,
        width: options.width || 512,
        height: options.height || 768,
        seed: options.seed || -1,
        sampler_name: options.sampler || 'DPM++ 2M Karras',
        batch_size: 1,
        n_iter: 1,
      }

      const response = await axios.post(`${BACKEND_URL}/generate`, payload, {
        timeout: 120000 // 2 minutes timeout
      })

      if (response.data.success && response.data.image) {
        return {
          success: true,
          image: response.data.image,
          seed: response.data.seed,
          prompt: payload.prompt
        }
      } else {
        throw new Error(response.data.error || 'Image generation failed')
      }
    } catch (error) {
      console.error('Image generation error:', error)
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to generate image'
      }
    }
  }

  enhanceFashionPrompt(userPrompt) {
    // Add quality and fashion-specific keywords to improve results
    const qualityTags = 'high quality, professional photography, detailed, sharp focus, 8k uhd'
    const fashionContext = 'fashion design, haute couture, runway style'

    return `${userPrompt}, ${fashionContext}, ${qualityTags}`
  }

  async getModels() {
    try {
      const response = await axios.get(`${BACKEND_URL}/models`, {
        timeout: 5000
      })
      return response.data.models || []
    } catch (error) {
      console.error('Failed to fetch models:', error)
      return []
    }
  }
}

export default new ImageGenerator()
