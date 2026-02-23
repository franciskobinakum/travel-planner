import { useEffect, useState } from "react"

function Itinerary() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("itinerary")) || []
    setItems(stored)

    const sum = stored.reduce((acc, item) => {
      if (item.offers?.[0]?.price?.total) {
        return (
          acc +
          parseFloat(item.offers[0].price.total)
        )
      }
      return acc
    }, 0)

    setTotal(sum)
  }, [])

  const clearItinerary = () => {
    localStorage.removeItem("itinerary")
    setItems([])
    setTotal(0)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        My Itinerary
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 shadow rounded mb-2"
        >
          <p>{item.hotel?.name}</p>
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-6">
        Estimated Budget: {total.toFixed(2)}
      </h3>

      <button
        onClick={clearItinerary}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Itinerary
      </button>
    </div>
  )
}

export default Itinerary