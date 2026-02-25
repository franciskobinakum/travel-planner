import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

function Hero() {
  const navigate = useNavigate()

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">

      {/* 🌄 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80')"
        }}
      />

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ✨ Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Plan Your Dream Trip <br />
          <span className="text-blue-400">Smarter & Faster</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl mb-8 text-gray-200">
          Discover destinations, calculate your travel budget,
          explore attractions and build your perfect itinerary —
          all in one place.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Start Exploring
        </button>
      </motion.div>
    </div>
  )
}

export default Hero