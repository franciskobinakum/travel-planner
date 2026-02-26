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
  const [loading, setLoading] = useState(true)

  // 🔎 Fetch coordinates
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
    } catch (error) {
      console.error("Geocoding error:", error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchCoordinates(title, setDestinationCoords)
      await fetchCoordinates(departureCity, setDepartureCoords)
      setLoading(false)
    }

    loadData()
  }, [title, departureCity])

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow">

          <h1 className="text-3xl font-bold mb-6">
            Route to {title}
          </h1>

          {/* Departure Input */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Departure City
            </label>

            <input
              type="text"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="border p-3 rounded w-full"
            />
          </div>

          {/* Route Map */}
          {!loading && destinationCoords && departureCoords && (
            <RouteMap
              from={departureCoords}
              to={destinationCoords}
            />
          )}

        </div>
      </div>
    </AnimatedPage>
  )
}

export default DestinationDetails