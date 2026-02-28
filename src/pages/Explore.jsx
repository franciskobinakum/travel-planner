import { useEffect, useState } from "react"
import axios from "axios"
import AnimatedPage from "../components/AnimatedPage"

function Explore() {
  const [attractions, setAttractions] = useState([])
  const [hotels, setHotels] = useState([])
  const [activities, setActivities] = useState([])
  const [coords, setCoords] = useState(null)

  const city = "Paris"

  // Get coordinates
  const fetchCoordinates = async () => {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q: city
        }
      }
    )

    if (res.data.length > 0) {
      setCoords({
        lat: parseFloat(res.data[0].lat),
        lng: parseFloat(res.data[0].lon)
      })
    }
  }

  // Fetch POIs
  const fetchPOIs = async (lat, lng) => {
    const query = `
      [out:json];
      (
        node["tourism"="attraction"](around:4000,${lat},${lng});
        node["tourism"="hotel"](around:4000,${lat},${lng});
        node["leisure"](around:4000,${lat},${lng});
      );
      out;
    `

    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } }
    )

    const results = res.data.elements

    setAttractions(
      results.filter((el) => el.tags?.tourism === "attraction").slice(0, 6)
    )

    setHotels(
      results.filter((el) => el.tags?.tourism === "hotel").slice(0, 6)
    )

    setActivities(
      results.filter((el) => el.tags?.leisure).slice(0, 6)
    )
  }

  useEffect(() => {
    fetchCoordinates()
  }, [])

  useEffect(() => {
    if (coords) {
      fetchPOIs(coords.lat, coords.lng)
    }
  }, [coords])

  return (
    <AnimatedPage>
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-6xl mx-auto p-8 text-white">

          <h1 className="text-4xl font-bold mb-12 text-center">
            Explore {city}
          </h1>

          <Section title="🏛 Attractions" items={attractions} />
          <Section title="🎯 Activities" items={activities} />
          <HotelSection hotels={hotels} />

        </div>
      </div>
    </AnimatedPage>
  )
}

export default Explore



// Section (Attractions & Activities)


function Section({ title, items }) {
  if (!items.length) return null

  return (
    <div className="mb-14">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/20 backdrop-blur-md p-5 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="font-bold">
              {item.tags?.name || "Unnamed Place"}
            </h3>

            <p className="text-sm mt-2 opacity-80">
              {item.tags?.tourism || item.tags?.leisure}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}



// Hotel Section With Price Estimator


function HotelSection({ hotels }) {
  if (!hotels.length) return null

  return (
    <div className="mb-14">
      <h2 className="text-2xl font-semibold mb-6">
        🏨 Accommodations
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}



// Hotel Card (Estimator + Booking)


function HotelCard({ hotel }) {
  const basePrice = Math.floor(Math.random() * 200) + 80

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [total, setTotal] = useState(0)
  const [booked, setBooked] = useState(false)

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return

    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const nights = (end - start) / (1000 * 60 * 60 * 24)

    if (nights > 0) {
      setTotal(nights * basePrice * guests)
    }
  }

  const handleBooking = () => {
    const booking = {
      hotel: hotel.tags?.name,
      checkIn,
      checkOut,
      guests,
      total
    }

    const existing =
      JSON.parse(localStorage.getItem("bookings")) || []

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existing, booking])
    )

    setBooked(true)
  }

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-lg">

      <h3 className="text-lg font-bold mb-2">
        {hotel.tags?.name || "Hotel"}
      </h3>

      <p className="text-green-600 font-semibold mb-3">
        ${basePrice} / night
      </p>

      <div className="space-y-3">

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Guests"
        />

        <button
          onClick={calculateTotal}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Calculate
        </button>

        {total > 0 && (
          <p className="font-semibold text-green-700">
            Total: ${total}
          </p>
        )}

        {total > 0 && !booked && (
          <button
            onClick={handleBooking}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Book Now
          </button>
        )}

        {booked && (
          <p className="text-green-600 font-bold">
            ✅ Booking Confirmed!
          </p>
        )}

      </div>
    </div>
  )
}