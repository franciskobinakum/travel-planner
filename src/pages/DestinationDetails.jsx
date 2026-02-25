import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function DestinationDetails() {
  const { title } = useParams()
  const [data, setData] = useState(null)
  const [attractions, setAttractions] = useState([])

  useEffect(() => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then(res => res.json())
      .then(data => setData(data))

    fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${title}%20tourist%20attractions&limit=5&namespace=0&format=json&origin=*`
    )
      .then(res => res.json())
      .then(data => {
        const results = data[1].map((name, index) => ({
          name,
          link: data[3][index]
        }))
        setAttractions(results)
      })
  }, [title])

  if (!data) return <p className="p-6">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">

      {data.thumbnail && (
        <img
          src={data.thumbnail.source}
          alt={data.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="mb-6">{data.extract}</p>

      {/* Attractions Section */}
      <h2 className="text-2xl font-bold mb-4">Top Attractions</h2>

      <ul className="space-y-2">
        {attractions.map((attraction, index) => (
          <li key={index}>
            <a
              href={attraction.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {attraction.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Map */}
      <iframe
        title="map"
        className="w-full h-80 mt-8 rounded-lg shadow"
        src={`https://maps.google.com/maps?q=${title}&output=embed`}
      ></iframe>
    </div>
  )
}

export default DestinationDetails