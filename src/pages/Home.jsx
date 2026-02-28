import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import SearchBar from "../components/SearchBar"

function Home() {
  const [destinations, setDestinations] = useState([])
  const [itinerary, setItinerary] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("itinerary")) || []
    setItinerary(saved)
  }, [])

  const addToItinerary = (destination) => {
    const existing = JSON.parse(localStorage.getItem("itinerary")) || []

    if (!existing.find((item) => item.name === destination.name)) {
      const updated = [...existing, destination]
      localStorage.setItem("itinerary", JSON.stringify(updated))
      setItinerary(updated)
    }
  }

  const trending = [
    {
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    {
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c"
    },
    {
      name: "Dubai",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090"
    },
    {
      name: "New York",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59"
    }
  ]

  return (
    <div className="min-h-screen">

      {/* ================= HERO ================= */}
      <div className="relative h-[80vh] animated-bg flex items-center justify-center overflow-hidden">

        <div className="floating-orb w-72 h-72 bg-pink-500 top-10 left-10"></div>
        <div className="floating-orb orb-delay-1 w-96 h-96 bg-blue-500 bottom-20 right-20"></div>
        <div className="floating-orb orb-delay-2 w-80 h-80 bg-purple-500 top-40 right-40"></div>

        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-6 z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Explore the World Beautifully
          </h1>

          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discover destinations, build itineraries, and plan smarter trips.
          </p>

          <Link
            to="/explore"
            className="bg-white dark:bg-gray-800 text-blue-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition duration-300"
          >
            Start Exploring
          </Link>
        </motion.div>
      </div>

      {/* ================= TRENDING DESTINATIONS ================= */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Trending Destinations
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-64 w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white text-xl font-bold">
                  {place.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <FeatureCard
              title="Smart Planning"
              description="Plan your trips efficiently with built-in itinerary and budget tools."
              icon="🧠"
            />

            <FeatureCard
              title="Interactive Maps"
              description="Visualize routes and destinations with real-time map previews."
              icon="🗺"
            />

            <FeatureCard
              title="Seamless Booking"
              description="Simulate bookings and manage travel plans all in one place."
              icon="✈️"
            />

          </div>
        </div>
      </div>

      {/* ================= SEARCH SECTION ================= */}
      <div className="max-w-6xl mx-auto p-6">

        <SearchBar setDestinations={setDestinations} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {destination.image && (
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-lg font-bold mb-2">
                  {destination.name}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {destination.description
                    ? destination.description.slice(0, 120) + "..."
                    : "No description available."}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/destination/${destination.name}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Route
                  </Link>

                  <button
                    onClick={() => addToItinerary(destination)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-gray-600 dark:text-gray-300 p-8 rounded-xl shadow"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

export default Home