import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import AnimatedPage from "../components/AnimatedPage"
import RouteMap from "../components/RouteMap"

function DestinationDetails() {
  const { title } = useParams()

  const [destinationCoords, setDestinationCoords] = useState(null)
  const [departureCoords, setDepartureCoords] = useState(null)
  const [departureCity, setDepartureCity] = useState("London")

  const [flights, setFlights] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FETCH COORDINATES 
  const fetchCoordinates = async (city, setter) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            format: "json",
            q: city
          }
        }
      )

      if (res.data.length > 0) {
        setter({
          lat: parseFloat(res.data[0].lat),
          lng: parseFloat(res.data[0].lon)
        })
      }
    } catch (err) {
      console.error("Geocoding error:", err)
    }
  }

  // FAKE DATA (UI DEMO) 
  const fetchMockData = () => {
    setFlights([
      { price: { total: 520 }, airline: "Air France" },
      { price: { total: 610 }, airline: "British Airways" },
      { price: { total: 480 }, airline: "Lufthansa" }
    ])

    setHotels([
      { name: "Grand Paris Hotel", price: 220 },
      { name: "Eiffel View Suites", price: 340 },
      { name: "Central Boutique Stay", price: 180 }
    ])
  }

  // LOAD EVERYTHING 
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        await fetchCoordinates(title, setDestinationCoords)
        await fetchCoordinates(departureCity, setDepartureCoords)

        fetchMockData()

      } catch (err) {
        setError("Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [title, departureCity])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading destination...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    )
  }

  return (
    <AnimatedPage>

      {/* HERO */}
      <div
        className="relative h-[50vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-3">{title}</h1>
          <p className="text-lg opacity-90">
            Discover flights, hotels and route planning.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">

        {/* QUICK STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Flights Available" value={flights.length} />
          <StatCard title="Hotels Available" value={hotels.length} />
          <StatCard title="Departure City" value={departureCity} />
        </div>

        {/* ROUTE MAP */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Route Preview
          </h2>

          <input
            type="text"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            placeholder="Enter departure city"
          />

          {destinationCoords && departureCoords && (
            <RouteMap
              from={departureCoords}
              to={destinationCoords}
            />
          )}
        </div>

        {/* FLIGHTS */}
        <h2 className="text-2xl font-semibold mb-6">Flights</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition hover:shadow-lg transition"
            >
              <p className="font-bold text-lg mb-2">
                ${flight.price.total}
              </p>
              <p className="text-gray-600 text-sm">
                Airline: {flight.airline}
              </p>
            </div>
          ))}
        </div>

        {/* HOTELS */}
        <h2 className="text-2xl font-semibold mt-12 mb-6">Hotels</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition hover:shadow-lg transition"
            >
              <p className="font-bold text-lg mb-2">
                {hotel.name}
              </p>
              <p className="text-green-600 font-semibold">
                ${hotel.price} / night
              </p>
            </div>
          ))}
        </div>

      </div>
    </AnimatedPage>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition text-center">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  )
}

export default DestinationDetails