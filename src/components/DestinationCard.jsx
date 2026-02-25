import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function DestinationCard({ destination }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded shadow overflow-hidden"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold">{destination.name}</h2>

        <Link
          to={`/destination/${destination.name}`}
          className="text-blue-600 text-sm"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default DestinationCard