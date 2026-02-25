import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = () => {
    if (!email || !password) return alert("Fill all fields")

    const users = JSON.parse(localStorage.getItem("users")) || []

    if (users.find(u => u.email === email))
      return alert("User already exists")

    users.push({ email, password })
    localStorage.setItem("users", JSON.stringify(users))

    alert("Registration successful")
    navigate("/login")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Register
      </button>
    </div>
  )
}

export default Register