import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"

function App() {
  const [destinations, setDestinations] = useState([])
  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem("itinerary")
    return saved ? JSON.parse(saved) : []
  })

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary))
  }, [itinerary])

  const addToItinerary = (destination) => {
    if (!itinerary.find((item) => item.name === destination.name)) {
      setItinerary([...itinerary, destination])
    }
  }

  const removeFromItinerary = (name) => {
    setItinerary(itinerary.filter((item) => item.name !== name))
  }

  const calculateTripDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = end - start
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Travel Planner</h1>
        <span>{itinerary.length} Saved</span>
      </header>

      <div className="max-w-5xl mx-auto p-6">

        {/* Date Picker Section */}
        <div className="bg-white p-5 rounded-lg shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Select Trip Dates</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </div>

          {calculateTripDays() > 0 && (
            <p className="mt-4 text-green-600 font-semibold">
              Trip Duration: {calculateTripDays()} days
            </p>
          )}
        </div>

        {/* Search */}
        <SearchBar setDestinations={setDestinations} />

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">{destination.name}</h2>

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

        {/* Itinerary Section */}
        {itinerary.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">My Itinerary</h2>

            {startDate && endDate && (
              <p className="mb-4 text-gray-700">
                Trip Dates: {startDate} → {endDate}
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {itinerary.map((item) => (
                <div
                  key={item.name}
                  className="bg-white p-4 rounded shadow flex justify-between"
                >
                  <span>{item.name}</span>
                  <button
                    onClick={() => removeFromItinerary(item.name)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App