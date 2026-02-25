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

  const [attractions, setAttractions] = useState([])
  const [hotels, setHotels] = useState([])
  const [activities, setActivities] = useState([])

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

  // 🏛 Fetch POIs from Overpass API
  const fetchPOIs = async (lat, lng) => {
    try {
      const query = `
        [out:json];
        (
          node["tourism"="attraction"](around:3000,${lat},${lng});
          node["tourism"="hotel"](around:3000,${lat},${lng});
          node["leisure"](around:3000,${lat},${lng});
        );
        out;
      `

      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "text/plain" } }
      )

      const results = res.data.elements

      setAttractions(
        results.filter((el) => el.tags?.tourism === "attraction").slice(0, 6)
      )

      setHotels(
        results.filter((el) => el.tags?.tourism === "hotel").slice(0, 6)
      )

      setActivities(
        results.filter((el) => el.tags?.leisure).slice(0, 6)
      )

    } catch (error) {
      console.error("Overpass error:", error)
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

  useEffect(() => {
    if (destinationCoords) {
      fetchPOIs(destinationCoords.lat, destinationCoords.lng)
    }
  }, [destinationCoords])

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Explore {title}
        </h1>

        {/* ROUTE SECTION */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold">
            Departure City
          </label>

          <input
            type="text"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            className="border p-3 rounded w-full mb-4"
          />

          <div className="flex gap-4 mb-4">
            {["car", "bike", "walk"].map((type) => (
              <button
                key={type}
                onClick={() => setMode(type)}
                className={`px-4 py-2 rounded ${
                  mode === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {type === "car" && "🚗"}
                {type === "bike" && "🚲"}
                {type === "walk" && "🚶"} {type}
              </button>
            ))}
          </div>

          {!loading && destinationCoords && departureCoords && (
            <RouteMap
              from={departureCoords}
              to={destinationCoords}
              mode={mode}
            />
          )}
        </div>

        {/* ATTRACTIONS */}
        <Section title="🏛 Attractions" items={attractions} />

        {/* ACTIVITIES */}
        <Section title="🎯 Activities" items={activities} />

        {/* ACCOMMODATIONS */}
        <Section title="🏨 Accommodations" items={hotels} />

      </div>
    </AnimatedPage>
  )
}

// 🧩 Reusable Section Component
function Section({ title, items }) {
  if (!items.length) return null

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold">
              {item.tags?.name || "Unnamed Place"}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {item.tags?.tourism || item.tags?.leisure}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinationDetails