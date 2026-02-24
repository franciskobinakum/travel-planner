import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import SearchBar from "./components/SearchBar"
import DestinationDetails from "./components/DestinationDetails"
import Home from "./components/Home"

function App() {
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem("itinerary")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary))
  }, [itinerary])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Travel Planner</h1>
      </header>

      <Routes>
        <Route
          path="/"
          element={<Home itinerary={itinerary} setItinerary={setItinerary} />}
        />
        <Route path="/destination/:title" element={<DestinationDetails />} />
      </Routes>
    </div>
  )
}

export default App