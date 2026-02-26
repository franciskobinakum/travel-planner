import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import DestinationDetails from "./pages/DestinationDetails"
import MyTrip from "./pages/MyTrip"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Explore from "./pages/Explore"

function App() {
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem("currentUser"))

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ✅ Navbar only when logged in AND not on auth pages */}
      {user && !hideNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
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

          <Route
            path="/my-trip"
            element={
              <ProtectedRoute>
                <MyTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
           }
         />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App