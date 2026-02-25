import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import Hero from "../components/Hero"
import AnimatedPage from "../components/AnimatedPage"
import MapPreview from "../components/MapPreview"

function Home() {
  const [query, setQuery] = useState("")
  const [destinations, setDestinations] = useState([])
  const [dailyBudget, setDailyBudget] = useState(0)
  const [days, setDays] = useState(1)
  const [loading, setLoading] = useState(false)

  const searchDestinations = async () => {
    if (!query) return

    try {
      setLoading(true)

      const res = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`
      )

      const results = await Promise.all(
        res.data.query.search.map(async (item, index) => {

          const coordRes = await axios.get(
            `https://en.wikipedia.org/w/api.php?action=query&titles=${item.title}&prop=coordinates&format=json&origin=*`
          )

          const pages = coordRes.data.query.pages
          const page = Object.values(pages)[0]

          const lat = page?.coordinates?.[0]?.lat || null
          const lng = page?.coordinates?.[0]?.lon || null

          return {
            id: index,
            name: item.title,
            description: item.snippet,
            image: `https://picsum.photos/seed/${encodeURIComponent(
              item.title
            )}/500/300`,
            lat,
            lng
          }
        })
      )

      setDestinations(results)
    } catch (error) {
      console.error("Error fetching destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalBudget = Number(dailyBudget) * Number(days)

  return (
    <>
      <Hero />

      <AnimatedPage>
        <div className="max-w-6xl mx-auto p-6">

          {/* Budget */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
            <h2 className="text-2xl font-bold mb-4">
              Budget Calculator
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Daily Budget ($)"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="border p-3 rounded w-full"
              />

              <input
                type="number"
                placeholder="Number of Days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="border p-3 rounded w-full"
              />
            </div>

            <p className="mt-4 text-green-600 font-semibold text-lg">
              Estimated Total Budget: ${totalBudget}
            </p>
          </div>

          {/* Search */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Search destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border p-3 rounded w-full"
            />
            <button
              onClick={searchDestinations}
              className="bg-blue-600 text-white px-6 rounded-lg"
            >
              Search
            </button>
          </div>

          {loading && (
            <p className="text-center text-gray-500">
              Searching destinations...
            </p>
          )}

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">
                    {destination.name}
                  </h3>

                  <p
                    className="text-gray-600 text-sm mb-4"
                    dangerouslySetInnerHTML={{
                      __html: destination.description
                    }}
                  />

                  {/* 🗺 Map Preview */}
                  {destination.lat && destination.lng && (
                    <MapPreview
                      lat={destination.lat}
                      lng={destination.lng}
                      name={destination.name}
                    />
                  )}

                  <Link
                    to={`/destination/${destination.name}`}
                    className="text-blue-600 hover:underline text-sm mt-4 block"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </AnimatedPage>
    </>
  )
}

export default Home