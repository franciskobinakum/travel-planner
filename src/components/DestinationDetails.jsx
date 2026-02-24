import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function DestinationDetails() {
  const { title } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [title])

  if (!data) return <p className="p-6">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* 🖼 Image */}
      {data.thumbnail && (
        <img
          src={data.thumbnail.source}
          alt={data.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}

      {/* 📝 Title */}
      <h1 className="text-3xl font-bold mb-4">
        {data.title}
      </h1>

      {/* 📖 Description */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {data.extract}
      </p>

      {/* 🗺 Map Integration */}
      <iframe
        title="map"
        className="w-full h-80 rounded-lg shadow"
        src={`https://maps.google.com/maps?q=${title}&output=embed`}
      ></iframe>
    </div>
  )
}

export default DestinationDetails