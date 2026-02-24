import { useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

function Home({ itinerary, setItinerary }) {
  const [destinations, setDestinations] = useState([])

  const addToItinerary = (destination) => {
    if (!itinerary.find((item) => item.name === destination.name)) {
      setItinerary([...itinerary, destination])
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <SearchBar setDestinations={setDestinations} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-white rounded-lg shadow overflow-hidden">

            {destination.image && (
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="text-lg font-bold mb-2">
                {destination.name}
              </h2>

              <p className="text-gray-600 mb-4 text-sm">
                {destination.description?.slice(0, 120)}...
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/destination/${destination.name}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </Link>

                <button
                  onClick={() => addToItinerary(destination)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home