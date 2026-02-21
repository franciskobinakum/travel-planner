import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function DestinationDetails() {
  const { id } = useParams()

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)

        // Get token
        const tokenRes = await axios.post(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: import.meta.env.VITE_AMADEUS_KEY,
            client_secret: import.meta.env.VITE_AMADEUS_SECRET,
          })
        )

        const accessToken = tokenRes.data.access_token

        // Fetch flights
        const res = await axios.get(
          "https://test.api.amadeus.com/v2/shopping/flight-offers",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              originLocationCode: "LON",
              destinationLocationCode: id,
              departureDate: "2024-12-01",
              adults: 1,
            },
          }
        )

        setFlights(res.data.data)

      } catch (error) {
        console.error("Flight fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [id])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Flights to {id}
      </h2>

      {loading && <p>Loading flights...</p>}

      <div className="space-y-4">
        {flights.slice(0, 5).map((flight, index) => (
          <div key={index} className="bg-white p-4 shadow rounded">
            <p>
              Airline: {flight.validatingAirlineCodes?.[0]}
            </p>
            <p>
              Price: {flight.price?.total} {flight.price?.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinationDetails