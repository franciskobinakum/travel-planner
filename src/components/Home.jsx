import { useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

function Home({ itinerary, setItinerary }) {
  const [destinations, setDestinations] = useState([])
  const [dailyBudget, setDailyBudget] = useState(0)
  const [days, setDays] = useState(1)

  const addToItinerary = (destination) => {
    if (!itinerary.find((item) => item.name === destination.name)) {
      setItinerary([...itinerary, destination])
    }
  }

  const totalBudget = dailyBudget * days

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 💰 Budget Calculator */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Budget Calculator</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Daily Budget ($)"
            onChange={(e) => setDailyBudget(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <input
            type="number"
            placeholder="Number of Days"
            onChange={(e) => setDays(e.target.value)}
            className="border p-3 rounded w-full"
          />
        </div>

        <p className="mt-4 text-green-600 font-semibold">
          Estimated Total Budget: ${totalBudget}
        </p>
      </div>

      {/* 🔍 Search */}
      <SearchBar setDestinations={setDestinations} />

      {/* 🌍 Destination Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-white rounded-lg shadow overflow-hidden transform hover:scale-105 transition duration-300"
          >
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
                {destination.description
                  ? destination.description.slice(0, 120) + "..."
                  : "No description available."}
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

      {/* 🗂 Itinerary Section */}
      {itinerary.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">My Itinerary</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itinerary.map((item) => (
              <div
                key={item.name}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home