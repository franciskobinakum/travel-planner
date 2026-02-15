import { useParams } from "react-router-dom"

function DestinationDetails() {
  const { id } = useParams()

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Destination Details
      </h2>

      <p className="text-gray-600">
        Selected Destination ID: {id}
      </p>
    </div>
  )
}

export default DestinationDetails