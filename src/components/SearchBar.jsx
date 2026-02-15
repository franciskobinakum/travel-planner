import { useState } from "react"
import axios from "axios"
console.log(import.meta.env.VITE_AMADEUS_KEY)

function SearchBar({ setDestinations }) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query) return

    try {
      setLoading(true)

      // Get access token
      const tokenRes = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_AMADEUS_KEY,
          client_secret: import.meta.env.VITE_AMADEUS_SECRET,
        })
      )

      const accessToken = tokenRes.data.access_token

      // Fetch destinations
      const res = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            keyword: query,
            subType: "CITY",
          },
        }
      )

      setDestinations(res.data.data)

    } catch (error) {
      console.error("Error fetching destinations:", error)
      alert("Something went wrong while fetching destinations.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search destination..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  )
}

export default SearchBar