import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

function Navbar() {
  const navigate = useNavigate()
  const { darkMode, toggleTheme } = useContext(ThemeContext)

  const logout = () => {
    localStorage.removeItem("currentUser")
    navigate("/login")
  }

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white p-4 flex justify-between items-center transition-colors duration-300">

      <Link to="/" className="font-bold text-xl">
        Travel Planner
      </Link>

      <nav className="flex gap-6 items-center">

        <Link to="/">Home</Link>
        <Link to="/my-trip">My Trip</Link>
        <Link to="/explore">Explore</Link>

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="bg-white dark:bg-gray-700 text-blue-600 dark:text-white px-3 py-1 rounded transition"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={logout}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Logout
        </button>

      </nav>
    </header>
  )
}

export default Navbar