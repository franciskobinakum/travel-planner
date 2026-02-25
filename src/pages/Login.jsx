import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const login = () => {
    localStorage.setItem("currentUser", JSON.stringify({ email }))
    navigate("/")
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 shadow rounded w-96">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />
        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login