import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
const PORT = process.env.PORT || 5000
const SD_API_URL = process.env.SD_API_URL || 'http://127.0.0.1:7860'

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Fashion Studio backend is running' })
})

// Check Stable Diffusion connection
app.get('/api/check-sd', async (req, res) => {
  try {
    const response = await axios.get(`${SD_API_URL}/sdapi/v1/sd-models`, {
      timeout: 5000
    })
    res.json({
      connected: true,
      models: response.data.length,
      url: SD_API_URL
    })
  } catch (error) {
    console.error('SD connection check failed:', error.message)
    res.json({
      connected: false,
      error: error.message,
      url: SD_API_URL
    })
  }
})

// Get available models
app.get('/api/models', async (req, res) => {
  try {
    const response = await axios.get(`${SD_API_URL}/sdapi/v1/sd-models`, {
      timeout: 5000
    })
    res.json({
      success: true,
      models: response.data.map(model => ({
        title: model.title,
        model_name: model.model_name,
        hash: model.hash
      }))
    })
  } catch (error) {
    console.error('Failed to fetch models:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch models from Stable Diffusion',
      details: error.message
    })
  }
})

// Generate image endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const {
      prompt,
      negative_prompt,
      steps,
      cfg_scale,
      width,
      height,
      seed,
      sampler_name
    } = req.body

    console.log('Generating image with prompt:', prompt)

    const payload = {
      prompt: prompt || '',
      negative_prompt: negative_prompt || 'low quality, blurry, distorted',
      steps: steps || 30,
      cfg_scale: cfg_scale || 7.5,
      width: width || 512,
      height: height || 768,
      seed: seed || -1,
      sampler_name: sampler_name || 'DPM++ 2M Karras',
      batch_size: 1,
      n_iter: 1,
      save_images: false,
      send_images: true
    }

    const response = await axios.post(
      `${SD_API_URL}/sdapi/v1/txt2img`,
      payload,
      {
        timeout: 120000, // 2 minutes
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data && response.data.images && response.data.images.length > 0) {
      console.log('Image generated successfully')
      res.json({
        success: true,
        image: response.data.images[0],
        seed: response.data.parameters?.seed || seed,
        info: response.data.info
      })
    } else {
      throw new Error('No image returned from Stable Diffusion')
    }
  } catch (error) {
    console.error('Image generation failed:', error.message)

    let errorMessage = 'Failed to generate image'
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to Stable Diffusion. Make sure it is running on ' + SD_API_URL
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Request timed out. The generation might be taking too long.'
    } else if (error.response) {
      errorMessage = error.response.data?.error || error.message
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: error.message
    })
  }
})

// Get progress (for long-running generations)
app.get('/api/progress', async (req, res) => {
  try {
    const response = await axios.get(`${SD_API_URL}/sdapi/v1/progress`, {
      timeout: 5000
    })
    res.json({
      success: true,
      progress: response.data.progress,
      eta_relative: response.data.eta_relative,
      state: response.data.state
    })
  } catch (error) {
    console.error('Failed to get progress:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to get generation progress'
    })
  }
})

// Interrupt generation
app.post('/api/interrupt', async (req, res) => {
  try {
    await axios.post(`${SD_API_URL}/sdapi/v1/interrupt`, {}, {
      timeout: 5000
    })
    res.json({ success: true, message: 'Generation interrupted' })
  } catch (error) {
    console.error('Failed to interrupt:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to interrupt generation'
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: err.message
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          🎨 AI Fashion Studio Backend Server 🎨          ║
║                                                           ║
║  Server running on:        http://localhost:${PORT}        ║
║  Stable Diffusion API:     ${SD_API_URL}     ║
║                                                           ║
║  Ready to generate fashion designs!                       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `)
})
