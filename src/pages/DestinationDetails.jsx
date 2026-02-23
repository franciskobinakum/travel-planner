import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function DestinationDetails() {
  const { city } = useParams()

  const [wikiData, setWikiData] = useState(null)
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchWikipedia()
    fetchHotels()
  }, [city])

  const fetchWikipedia = async () => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
      )
      const data = await res.json()
      setWikiData(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchHotels = async () => {
    try {
      setLoading(true)

      const tokenResponse = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_AMADEUS_KEY,
          client_secret: import.meta.env.VITE_AMADEUS_SECRET,
        })
      )

      const accessToken = tokenResponse.data.access_token

      const hotelRes = await axios.get(
        "https://test.api.amadeus.com/v2/shopping/hotel-offers",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            cityCode: city.substring(0, 3).toUpperCase(),
          },
        }
      )

      setHotels(hotelRes.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const saveToItinerary = (item) => {
    const existing =
      JSON.parse(localStorage.getItem("itinerary")) || []
    localStorage.setItem(
      "itinerary",
      JSON.stringify([...existing, item])
    )
    alert("Saved to itinerary!")
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Wikipedia Section */}
      {wikiData && (
        <div className="bg-white p-6 shadow rounded mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {wikiData.title}
          </h2>

          {wikiData.thumbnail && (
            <img
              src={wikiData.thumbnail.source}
              alt={wikiData.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
          )}

          <p className="mb-4">{wikiData.extract}</p>

          <a
            href={wikiData.content_urls?.desktop?.page}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Read more on Wikipedia
          </a>
        </div>
      )}

      {/* Hotels */}
      <h3 className="text-xl font-bold mb-4">
        Accommodations
      </h3>

      {loading && <p>Loading hotels...</p>}

      {hotels.slice(0, 5).map((hotel, i) => (
        <div
          key={i}
          className="bg-white p-4 shadow rounded mb-3"
        >
          <p>{hotel.hotel?.name}</p>
          <p>
            Price: {hotel.offers?.[0]?.price?.total}{" "}
            {hotel.offers?.[0]?.price?.currency}
          </p>

          <button
            onClick={() => saveToItinerary(hotel)}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >
            Add to Itinerary
          </button>
        </div>
      ))}
    </div>
  )
}

export default DestinationDetails