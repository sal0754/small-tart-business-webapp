import { useEffect, useState } from "react"

function App() {
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    fetch("/api/db-test")
      .then(res => res.json())
      .then(data => {
        setMessage(JSON.stringify(data, null, 2))
      })
      .catch(err => {
        console.error(err)
        setMessage("❌ Could not reach backend / database")
      })
  }, []) // <-- this means "run once when page loads"

  return (
    <div style={{ padding: 20 }}>
      <h1>Backend / DB Test</h1>
      <pre>{message}</pre>
    </div>
  )
}

export default App