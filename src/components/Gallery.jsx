import React, { useState } from 'react'

function Gallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleDownload = (image) => {
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${image.image}`
    link.download = `fashion-design-${image.id}.png`
    link.click()
  }

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-12">
        <div className="text-center text-gray-400">
          <svg className="w-32 h-32 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Designs Yet</h3>
          <p className="text-gray-500">Generate your first fashion design in the Design Studio</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Designs</h2>
            <p className="text-gray-600 text-sm">{images.length} design{images.length !== 1 ? 's' : ''} generated</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`data:image/png;base64,${image.image}`}
                alt={image.prompt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Design Details</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={`data:image/png;base64,${selectedImage.image}`}
                    alt={selectedImage.prompt}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Prompt</label>
                    <p className="mt-1 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                      {selectedImage.prompt}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Seed</label>
                    <p className="mt-1 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg font-mono">
                      {selectedImage.seed}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Created</label>
                    <p className="mt-1 text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                      {new Date(selectedImage.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDownload(selectedImage)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Design</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
