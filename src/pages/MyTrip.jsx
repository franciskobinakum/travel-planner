import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function MyTrip() {
  const [itinerary, setItinerary] = useState([])
  const [dailyBudget, setDailyBudget] = useState(0)
  const [days, setDays] = useState(1)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("itinerary")) || []
    setItinerary(saved)
  }, [])

  const totalBudget = dailyBudget * days
  const completion =
    itinerary.length > 0 ? Math.min(itinerary.length * 25, 100) : 0

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-white"
        >
          <h1 className="text-4xl font-bold mb-2">
            My Trip Dashboard
          </h1>
          <p className="opacity-90">
            Manage your destinations, budget, and trip progress.
          </p>
        </motion.div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Destinations" value={itinerary.length} />
          <StatCard title="Estimated Budget" value={`$${totalBudget}`} />
          <StatCard title="Trip Duration" value={`${days} Days`} />
          <StatCard title="Completion" value={`${completion}%`} />
        </div>

        {/* ================= PROGRESS ================= */}
        <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-xl mb-10">
          <h2 className="font-semibold mb-3 text-white">
            Trip Planning Progress
          </h2>

          <div className="bg-white/30 rounded-full h-4">
            <div
              className="bg-green-400 h-4 rounded-full transition-all duration-700"
              style={{ width: `${completion}%` }}
            ></div>
          </div>

          <p className="mt-2 text-sm text-white/80">
            {completion}% completed
          </p>
        </div>

        {/* ================= DESTINATIONS ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">
            Saved Destinations
          </h2>

          {itinerary.length === 0 ? (
            <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-md p-10 rounded-xl text-center text-white">
              <p className="mb-2">
                You haven’t added any destinations yet.
              </p>
              <p className="text-sm opacity-80">
                Start exploring and build your dream trip.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-xl text-white"
                >
                  <h3 className="text-lg font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm opacity-80">
                    Ready to explore this destination.
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-xl text-center text-white"
    >
      <p className="text-sm opacity-80 mb-2">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </motion.div>
  )
}

export default MyTrip