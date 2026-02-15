import { useState } from "react"
import SearchBar from "./components/SearchBar"

function App() {
  const [destinations, setDestinations] = useState([])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-semibold">Travel Planner</h1>
      </nav>

      <main className="p-6">
        <SearchBar setDestinations={setDestinations} />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow"
            >
              <h2 className="text-lg font-bold">
                {dest.name}
              </h2>
              <p className="text-gray-600">
                {dest.address?.countryName}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App