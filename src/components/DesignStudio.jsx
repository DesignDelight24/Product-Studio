import React, { useState } from 'react'
import imageGenerator from '../services/imageGenerator'

function DesignStudio({ onImageGenerated }) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [error, setError] = useState(null)
  const [settings, setSettings] = useState({
    garmentType: 'dress',
    style: 'modern',
    steps: 30,
    cfgScale: 7.5
  })

  const garmentTypes = [
    { value: 'dress', label: 'Dress' },
    { value: 'suit', label: 'Suit' },
    { value: 'jacket', label: 'Jacket' },
    { value: 'pants', label: 'Pants' },
    { value: 'shirt', label: 'Shirt' },
    { value: 'skirt', label: 'Skirt' },
    { value: 'coat', label: 'Coat' },
    { value: 'accessories', label: 'Accessories' }
  ]

  const styles = [
    { value: 'modern', label: 'Modern' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'bohemian', label: 'Bohemian' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'elegant', label: 'Elegant' },
    { value: 'streetwear', label: 'Streetwear' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a design description')
      return
    }

    setIsGenerating(true)
    setError(null)
    setCurrentImage(null)

    const fullPrompt = `${settings.style} ${settings.garmentType}, ${prompt}`

    const result = await imageGenerator.generateImage(fullPrompt, {
      steps: settings.steps,
      cfgScale: settings.cfgScale,
      width: 512,
      height: 768
    })

    setIsGenerating(false)

    if (result.success) {
      const imageData = {
        id: Date.now(),
        image: result.image,
        prompt: fullPrompt,
        seed: result.seed,
        timestamp: new Date().toISOString()
      }
      setCurrentImage(imageData)
      onImageGenerated(imageData)
    } else {
      setError(result.error)
    }
  }

  const handleDownload = () => {
    if (!currentImage) return

    const link = document.createElement('a')
    link.href = `data:image/png;base64,${currentImage.image}`
    link.download = `fashion-design-${currentImage.id}.png`
    link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Controls */}
      <div className="bg-white rounded-xl shadow-2xl p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Design Your Fashion</h2>
          <p className="text-gray-600 text-sm">Describe your vision and let AI bring it to life</p>
        </div>

        {/* Garment Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Garment Type
          </label>
          <select
            value={settings.garmentType}
            onChange={(e) => setSettings({ ...settings, garmentType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {garmentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Style */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Style
          </label>
          <select
            value={settings.style}
            onChange={(e) => setSettings({ ...settings, style: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {styles.map(style => (
              <option key={style.value} value={style.value}>{style.label}</option>
            ))}
          </select>
        </div>

        {/* Prompt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Design Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe colors, patterns, fabrics, details... (e.g., 'flowing silk fabric with floral patterns in pastel pink and blue')"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* Advanced Settings */}
        <details className="bg-gray-50 rounded-lg p-4">
          <summary className="cursor-pointer font-semibold text-gray-700">
            Advanced Settings
          </summary>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Steps: {settings.steps}
              </label>
              <input
                type="range"
                min="20"
                max="50"
                value={settings.steps}
                onChange={(e) => setSettings({ ...settings, steps: parseInt(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">More steps = better quality but slower</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CFG Scale: {settings.cfgScale}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={settings.cfgScale}
                onChange={(e) => setSettings({ ...settings, cfgScale: parseFloat(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">How closely to follow the prompt</p>
            </div>
          </div>
        </details>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Design</span>
            </>
          )}
        </button>
      </div>

      {/* Right Panel - Preview */}
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
        <div className="aspect-[2/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {isGenerating ? (
            <div className="text-center">
              <div className="loading-shimmer w-full h-full"></div>
              <p className="text-gray-500 mt-4">Creating your design...</p>
            </div>
          ) : currentImage ? (
            <div className="relative w-full h-full">
              <img
                src={`data:image/png;base64,${currentImage.image}`}
                alt="Generated fashion design"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Your design will appear here</p>
            </div>
          )}
        </div>

        {currentImage && (
          <div className="mt-4 space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Prompt</p>
              <p className="text-sm text-gray-700">{currentImage.prompt}</p>
            </div>
            <button
              onClick={handleDownload}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Design</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DesignStudio
