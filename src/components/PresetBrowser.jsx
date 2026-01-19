import React, { useState } from 'react'
import { presetCategories, getPresetsByCategory } from '../data/presets'

function PresetBrowser({ onSelectPreset, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(presetCategories[0].id)
  const [searchTerm, setSearchTerm] = useState('')

  const currentPresets = getPresetsByCategory(selectedCategory).filter(preset =>
    preset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    preset.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePresetClick = (preset) => {
    onSelectPreset(preset)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Fashion Presets</h2>
              <p className="text-purple-100 mt-1">Choose from our curated collection of fashion styles</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-100 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search presets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-purple-300 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
          {presetCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-white'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentPresets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No presets found</h3>
              <p className="text-gray-500">Try adjusting your search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset)}
                  className="group bg-white rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-200 overflow-hidden text-left"
                >
                  {/* Thumbnail */}
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
                    <span className="text-7xl">{preset.thumbnail}</span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {preset.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {preset.prompt}
                    </p>

                    {/* Settings Preview */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Steps: {preset.settings.steps}
                      </span>
                      <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                        CFG: {preset.settings.cfgScale}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {preset.settings.width}×{preset.settings.height}
                      </span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/5 transition-all pointer-events-none" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            {currentPresets.length} preset{currentPresets.length !== 1 ? 's' : ''} available in {presetCategories.find(c => c.id === selectedCategory)?.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PresetBrowser
