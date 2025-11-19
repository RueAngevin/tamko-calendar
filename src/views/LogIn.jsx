import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LogIn() {
  
  const { login, user } = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      await login(email, password)
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <div className="h-[30rem] mt-[5rem] w-[30rem] bg-white rounded-3xl flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">
        Log In to add events
      </h1>
      <div className="w-full p-10 flex flex-col gap-3">
        <div>
          <p>Email</p>
          <input
            className="border rounded-md w-full h-10 p-2"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            className="border rounded-md w-full h-10 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleLogin}
        className="p-2 w-30 border rounded-md cursor-pointer hover:bg-[#b4c8ff] transition-colors duration-200"
      >
        Log In
      </button>
    </div>
  );
}

export default LogIn;
