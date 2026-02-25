import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import DestinationDetails from "./pages/DestinationDetails"
import MyTrip from "./pages/MyTrip"
import Login from "./pages/Login"

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"))

  return (
    <>
      {user && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes>
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App