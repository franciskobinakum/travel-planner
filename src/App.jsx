import { useState } from "react"
import SearchBar from "./components/SearchBar"
import DestinationCard from "./components/DestinationCard"

function App() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-semibold">
          Travel Planner
        </h1>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
        {/* Search Bar */}
        <SearchBar
          setDestinations={setDestinations}
          setLoading={setLoading}
          setError={setError}
        />

        {/* Loading State */}
        {loading && (
          <p className="mt-4 text-blue-600 font-medium">
            Searching destinations...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p className="mt-4 text-red-600 font-medium">
            {error}
          </p>
        )}

        {/* No Results */}
        {!loading && destinations.length === 0 && (
          <p className="mt-4 text-gray-500">
            No destinations yet. Try searching for a city.
          </p>
        )}

        {/* Results Grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {destinations.map((dest, index) => (
            <DestinationCard
              key={index}
              destination={dest}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App