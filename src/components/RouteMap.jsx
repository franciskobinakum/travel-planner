import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet-routing-machine"
import { useEffect } from "react"

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

function Routing({ from, to, mode }) {
  const map = useMap()

  useEffect(() => {
    if (!from || !to) return

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng)
      ],
      // ⚠️ OSRM public server supports driving only
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1"
      }),
      lineOptions: {
        styles: [
          {
            color:
              mode === "car"
                ? "#2563eb"
                : mode === "bike"
                ? "#16a34a"
                : "#f97316",
            weight: 5
          }
        ]
      },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true
    }).addTo(map)

    return () => {
      map.removeControl(routingControl)
    }
  }, [from?.lat, from?.lng, to?.lat, to?.lng, mode])

  return null
}

function RouteMap({ from, to, mode }) {
  if (!from || !to) return null

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden mt-6">
      <MapContainer
        center={[from.lat, from.lng]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Routing from={from} to={to} mode={mode} />
      </MapContainer>
    </div>
  )
}

export default RouteMap