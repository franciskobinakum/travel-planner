import { Link } from "react-router-dom"

function DestinationCard({ destination }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold">
        {destination.name}
      </h2>

      <p>{destination.address.countryName}</p>

      <Link
        to={`/details/${destination.name}`}
        className="text-blue-600 underline mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  )
}

export default DestinationCard