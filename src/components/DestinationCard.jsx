import { useNavigate } from "react-router-dom"

function DestinationCard({ destination }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!destination.iataCode) {
      alert("This destination has no flight search code.")
      return
    }

    navigate(`/details/${destination.iataCode}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-lg font-bold">
        {destination.name}
      </h2>

      <p className="text-gray-600">
        {destination.address?.countryName}
      </p>

      <p className="text-sm text-gray-400 mt-1">
        Code: {destination.iataCode}
      </p>
    </div>
  )
}

export default DestinationCard