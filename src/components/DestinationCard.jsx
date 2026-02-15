import { useNavigate } from "react-router-dom"

function DestinationCard({ destination }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/details/${destination.id}`)}
      className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-lg font-bold">
        {destination.name}
      </h2>
      <p className="text-gray-600">
        {destination.address?.countryName}
      </p>
    </div>
  )
}

export default DestinationCard