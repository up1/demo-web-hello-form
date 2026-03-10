import { useEffect, useState } from 'react'
import './App.css'

declare global {
  interface Window {
    receiveUsername?: (username: string) => void
  }
}

function App() {
  const [username, setUsername] = useState('')
  const [helloMessage, setHelloMessage] = useState('')

  useEffect(() => {
    window.receiveUsername = (name: string) => {
      setUsername(name)
    }
  }, [])

  const handleSent = () => {
    try {
      // Flutter WebView Android
      (window as any).FlutterChannel?.postMessage(helloMessage)
    } catch {
      // ignore
    }
    try {
      // Flutter WebView iOS
      ;(window as any).webkit?.messageHandlers?.FlutterChannel?.postMessage(helloMessage)
    } catch {
      // ignore
    }
  }

  return (
    <div className="container">
      <label id="welcome_message" className="welcome-label">
        {username ? `Hello, ${username}` : 'Welcome'}
      </label>

      <div className="form-group">
        <input
          id="hello_message"
          type="text"
          placeholder="Enter your message"
          value={helloMessage}
          onChange={(e) => setHelloMessage(e.target.value)}
        />
        <button id="sent_button" onClick={handleSent}>
          Sent
        </button>
      </div>
    </div>
  )
}

export default App
