import { useState } from "react"

function SearchBar({ setDestinations }) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=6&namespace=0&format=json&origin=*`
      )

      const data = await response.json()

      const results = await Promise.all(
        data[1].map(async (title, index) => {
          try {
            const summaryRes = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
            )
            const summaryData = await summaryRes.json()

            return {
              id: index,
              name: title,
              description: summaryData.extract,
              link: summaryData.content_urls?.desktop?.page,
              image: summaryData.thumbnail?.source || null
            }
          } catch {
            return null
          }
        })
      )

      setDestinations(results.filter(Boolean))

    } catch (err) {
      console.error(err)
      setError("Failed to fetch destinations.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-gray-600 mt-4">Searching...</p>
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  )
}

export default SearchBar