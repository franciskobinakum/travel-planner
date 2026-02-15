import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import SearchBar from "./components/SearchBar"
import DestinationCard from "./components/DestinationCard"
import DestinationDetails from "./pages/DestinationDetails"

function Home() {
  const [destinations, setDestinations] = useState([])

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <SearchBar setDestinations={setDestinations} />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {destinations.map((dest, index) => (
          <DestinationCard key={index} destination={dest} />
        ))}
      </div>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-semibold">
          Travel Planner
        </h1>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DestinationDetails />} />
      </Routes>
    </div>
  )
}

export default App