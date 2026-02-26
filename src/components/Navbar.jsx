import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("currentUser")
    navigate("/login")
  }

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Travel Planner</Link>

      <nav className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/my-trip">My Trip</Link>
        <Link to="/explore">Explore</Link>

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