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
  const completion = itinerary.length > 0 ? Math.min(itinerary.length * 25, 100) : 0

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-2">My Trip Dashboard</h1>
        <p className="text-gray-600">
          Manage your destinations, budget, and trip progress.
        </p>
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <StatCard title="Destinations" value={itinerary.length} color="bg-blue-500" />

        <StatCard title="Estimated Budget" value={`$${totalBudget}`} color="bg-green-500" />

        <StatCard title="Trip Duration" value={`${days} Days`} color="bg-purple-500" />

        <StatCard title="Completion" value={`${completion}%`} color="bg-pink-500" />

      </div>

      {/* ================= PROGRESS BAR ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="font-semibold mb-3">Trip Planning Progress</h2>

        <div className="bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-700"
            style={{ width: `${completion}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {completion}% completed
        </p>
      </div>

      {/* ================= BUDGET CONTROLS ================= */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="font-semibold mb-4">Budget Calculator</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Daily Budget ($)"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(Number(e.target.value))}
            className="border p-3 rounded w-full"
          />

          <input
            type="number"
            placeholder="Number of Days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="border p-3 rounded w-full"
          />
        </div>

        <p className="mt-4 text-lg font-semibold text-green-600">
          Total Budget: ${totalBudget}
        </p>
      </div>

      {/* ================= DESTINATIONS ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Saved Destinations</h2>

        {itinerary.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-600 mb-4">
              You haven’t added any destinations yet.
            </p>
            <p className="text-gray-400 text-sm">
              Start exploring and add destinations to see them here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itinerary.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="text-lg font-bold mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Ready to explore this destination.
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow flex flex-col items-center"
    >
      <div className={`w-12 h-12 ${color} rounded-full mb-3`}></div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </motion.div>
  )
}

export default MyTrip