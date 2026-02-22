import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function DestinationDetails() {
  const { id } = useParams()

  const [flights, setFlights] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching travel data for:", id)

        // 1️⃣ Get OAuth token
        const tokenResponse = await axios.post(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: import.meta.env.VITE_AMADEUS_KEY,
            client_secret: import.meta.env.VITE_AMADEUS_SECRET,
          })
        )

        const accessToken = tokenResponse.data.access_token

        // Generate dynamic future date (7 days from now)
        const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]

        console.log("Departure Date:", futureDate)

        // 2️⃣ Fetch Flight Offers
        try {
          const flightResponse = await axios.get(
            "https://test.api.amadeus.com/v2/shopping/flight-offers",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                originLocationCode: "LON",
                destinationLocationCode: id,
                departureDate: futureDate,
                adults: 1,
              },
            }
          )

          console.log("Flights Response:", flightResponse.data)
          setFlights(flightResponse.data.data || [])
        } catch (flightError) {
          console.error("Flight fetch error:", flightError.response?.data || flightError)
          setFlights([])
        }

        // 3️⃣ Fetch Hotel Offers
        try {
          const hotelResponse = await axios.get(
            "https://test.api.amadeus.com/v2/shopping/hotel-offers",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              params: {
                cityCode: id,
              },
            }
          )

          console.log("Hotels Response:", hotelResponse.data)
          setHotels(hotelResponse.data.data || [])
        } catch (hotelError) {
          console.error("Hotel fetch error:", hotelError.response?.data || hotelError)
          setHotels([])
        }

      } catch (err) {
        console.error("Token error:", err.response?.data || err)
        setError("Failed to authenticate with Amadeus API.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTravelData()
    }
  }, [id])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Travel Options for {id}
      </h2>

      {loading && (
        <p className="text-blue-600 font-medium">
          Loading travel data...
        </p>
      )}

      {error && (
        <p className="text-red-600 font-medium">
          {error}
        </p>
      )}

      {/* Flights Section */}
      <h3 className="text-xl font-semibold mt-6 mb-4">
        Flight Offers
      </h3>

      {flights.length === 0 && !loading && (
        <p className="text-gray-500">No flights found.</p>
      )}

      <div className="space-y-4">
        {flights.slice(0, 5).map((flight, index) => (
          <div key={index} className="bg-white p-4 shadow rounded">
            <p>
              Airline: {flight.validatingAirlineCodes?.[0]}
            </p>
            <p>
              Price: {flight.price?.total}{" "}
              {flight.price?.currency}
            </p>
          </div>
        ))}
      </div>

      {/* Hotels Section */}
      <h3 className="text-xl font-semibold mt-10 mb-4">
        Hotel Offers
      </h3>

      {hotels.length === 0 && !loading && (
        <p className="text-gray-500">No hotels found.</p>
      )}

      <div className="space-y-4">
        {hotels.slice(0, 5).map((hotel, index) => (
          <div key={index} className="bg-white p-4 shadow rounded">
            <p className="font-medium">
              {hotel.hotel?.name}
            </p>
            <p>
              Price: {hotel.offers?.[0]?.price?.total}{" "}
              {hotel.offers?.[0]?.price?.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinationDetails