import React, { useState } from 'react'
import Header from './components/Header'
import DesignStudio from './components/DesignStudio'
import Gallery from './components/Gallery'
import ConnectionStatus from './components/ConnectionStatus'

function App() {
  const [activeTab, setActiveTab] = useState('studio')
  const [generatedImages, setGeneratedImages] = useState([])

  const handleImageGenerated = (imageData) => {
    setGeneratedImages(prev => [imageData, ...prev])
  }

  return (
    <div className="min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <ConnectionStatus />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {activeTab === 'studio' && (
          <DesignStudio onImageGenerated={handleImageGenerated} />
        )}
        {activeTab === 'gallery' && (
          <Gallery images={generatedImages} />
        )}
      </main>

      <footer className="text-center py-6 text-white/80 text-sm">
        <p>AI Fashion Studio - Powered by Local Stable Diffusion</p>
        <p className="mt-1">No cloud APIs • 100% Local • Privacy First</p>
      </footer>
    </div>
  )
}

export default App
