import { useState } from "react"
import axios from "axios"
import AnimatedPage from "../components/AnimatedPage"
import DestinationCard from "../components/DestinationCard"

function Home() {
  const [query, setQuery] = useState("")
  const [destinations, setDestinations] = useState([])
  const [dailyBudget, setDailyBudget] = useState(0)
  const [days, setDays] = useState(1)

  const search = async () => {
    const res = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`
    )

    const results = res.data.query.search.map((item, index) => ({
      id: index,
      name: item.title,
      description: item.snippet,
      image: `https://source.unsplash.com/400x300/?${item.title}`
    }))

    setDestinations(results)
  }

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="font-bold text-xl mb-4">Budget Calculator</h2>

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Daily Budget"
              onChange={(e) => setDailyBudget(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              placeholder="Days"
              onChange={(e) => setDays(e.target.value)}
              className="border p-3 rounded w-full"
            />
          </div>

          <p className="mt-4 text-green-600 font-semibold">
            Total: ${dailyBudget * days}
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-3 rounded w-full"
          />
          <button
            onClick={search}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Search
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  )
}

export default Home