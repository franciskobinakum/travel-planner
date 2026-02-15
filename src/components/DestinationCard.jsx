function DestinationCard({ destination }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
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