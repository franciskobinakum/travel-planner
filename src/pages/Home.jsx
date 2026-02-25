import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import Hero from "../components/Hero"
import AnimatedPage from "../components/AnimatedPage"

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

      const results = res.data.query.search.map((item, index) => ({
        id: index,
        name: item.title,
        description: item.snippet,
        image: `https://picsum.photos/seed/${encodeURIComponent(
          item.title
        )}/500/300`
      }))

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
      {/* 🌄 HERO SECTION */}
      <Hero />

      <AnimatedPage>
        <div className="max-w-6xl mx-auto p-6">

          {/* 💰 Budget Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg mb-10"
          >
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
          </motion.div>

          {/* 🔍 Search Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mb-8"
          >
            <input
              type="text"
              placeholder="Search destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border p-3 rounded w-full"
            />

            <button
              onClick={searchDestinations}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
            >
              Search
            </button>
          </motion.div>

          {/* 🔄 Loading */}
          {loading && (
            <p className="text-center text-gray-500">
              Searching destinations...
            </p>
          )}

          {/* 🌍 Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                whileHover={{ scale: 1.05 }}
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

                  <Link
                    to={`/destination/${destination.name}`}
                    className="text-blue-600 hover:underline text-sm"
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