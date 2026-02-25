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
  const [mode, setMode] = useState("car")
  const [loading, setLoading] = useState(true)

  // 🔎 Fetch coordinates using OpenStreetMap Nominatim
  const fetchCoordinates = async (city, setter) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            format: "json",
            q: city
          },
          headers: {
            "Accept-Language": "en"
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

  // 📍 Fetch destination + departure coordinates
  useEffect(() => {
    const loadCoords = async () => {
      setLoading(true)

      await fetchCoordinates(title, setDestinationCoords)
      await fetchCoordinates(departureCity, setDepartureCoords)

      setLoading(false)
    }

    loadCoords()
  }, [title, departureCity])

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Route Preview to {title}
        </h1>

        {/* 🛫 Departure Input */}
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

        

        {/* 🗺 Loading State */}
        {loading && (
          <p className="text-gray-500">
            Loading route...
          </p>
        )}

        {/* 🗺 Route Map */}
        {!loading && destinationCoords && departureCoords && (
          <RouteMap
            from={departureCoords}
            to={destinationCoords}
            mode={mode}
          />
        )}

      </div>
    </AnimatedPage>
  )
}

export default DestinationDetails