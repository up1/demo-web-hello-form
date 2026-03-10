import { useEffect, useState } from 'react'
import './App.css'

interface FlutterChannel {
  postMessage(message: string): void
}

declare global {
  interface Window {
    receiveUsername?: (username: string) => void
    webkit?: {
      messageHandlers: {
        FlutterChannel?: FlutterChannel
      }
    }
  }
  var FlutterChannel: FlutterChannel | undefined
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
    if (typeof FlutterChannel !== 'undefined') {
      FlutterChannel.postMessage(helloMessage);
    } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.FlutterChannel) {
      window.webkit.messageHandlers.FlutterChannel.postMessage(helloMessage);
    }
  }

  return (
    <div className="container">
      <label htmlFor="welcome_message" className="welcome-label">
        {username ? `Hello, ${username}` : 'Welcome'}
      </label>

      <div className="form-group">
        <input
          id="hello_message"
          aria-label="hello_message"
          type="text"
          placeholder="Enter your message"
          value={helloMessage}
          onChange={(e) => setHelloMessage(e.target.value)}
        />
        <button id="sent_button" aria-label="sent_button" onClick={handleSent}>
          Sent
        </button>
      </div>
    </div>
  )
}

export default App
