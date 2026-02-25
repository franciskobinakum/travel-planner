import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      alert("Invalid email or password")
      return
    }

    // Save logged in user
    localStorage.setItem("currentUser", JSON.stringify(user))

    // Redirect to home
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login