import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import DestinationDetails from "./components/DestinationDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [itinerary, setItinerary] = useState([])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home
              itinerary={itinerary}
              setItinerary={setItinerary}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/destination/:title"
        element={
          <ProtectedRoute>
            <DestinationDetails />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App