import React, { useState, useEffect } from 'react'
import imageGenerator from '../services/imageGenerator'

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const checkConnection = async () => {
    setIsChecking(true)
    const connected = await imageGenerator.checkConnection()
    setIsConnected(connected)
    setIsChecking(false)
  }

  return (
    <div className="container mx-auto px-4 pt-4 max-w-7xl">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
        isConnected
          ? 'bg-green-500/20 border border-green-500/30'
          : 'bg-red-500/20 border border-red-500/30'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isChecking
              ? 'bg-yellow-400 animate-pulse'
              : isConnected
              ? 'bg-green-400'
              : 'bg-red-400'
          }`} />
          <span className="text-white font-medium">
            {isChecking
              ? 'Checking connection...'
              : isConnected
              ? 'Connected to Stable Diffusion'
              : 'Stable Diffusion not connected'}
          </span>
        </div>
        {!isConnected && !isChecking && (
          <div className="flex-1">
            <p className="text-white/80 text-sm">
              Make sure Stable Diffusion web UI is running on http://127.0.0.1:7860 with --api flag
            </p>
          </div>
        )}
        <button
          onClick={checkConnection}
          disabled={isChecking}
          className="ml-auto px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-sm transition-colors disabled:opacity-50"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default ConnectionStatus
