import { useState } from "react"
import SearchBar from "./components/SearchBar"

function App() {
  const [destinations, setDestinations] = useState([])
  const [itinerary, setItinerary] = useState([])

  const addToItinerary = (destination) => {
    if (!itinerary.find((item) => item.name === destination.name)) {
      setItinerary([...itinerary, destination])
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Travel Planner</h1>
        <button
          onClick={() => alert(JSON.stringify(itinerary, null, 2))}
          className="underline"
        >
          My Itinerary
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Search Component */}
        <SearchBar setDestinations={setDestinations} />

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {destinations.length > 0 &&
            destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white p-5 rounded-lg shadow"
              >
                <h2 className="text-lg font-bold mb-2">
                  {destination.name}
                </h2>

                <p className="text-gray-600 mb-4">
                  {destination.description || "No description available."}
                </p>

                <div className="flex justify-between items-center">
                  <a
                    href={destination.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </a>

                  <button
                    onClick={() => addToItinerary(destination)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {destinations.length === 0 && (
          <p className="text-gray-500 mt-6">
            Search for a destination to begin planning your trip.
          </p>
        )}
      </div>
    </div>
  )
}

export default App