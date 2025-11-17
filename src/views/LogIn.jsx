import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const logInUser = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user.email);
      console.log("logged in", result.user.email);
    } catch (error) {
      alert("invalid email or password");
      console.log(error);
    }
  };

  return (
    <div className="h-[30rem] mt-[5rem] w-[30rem] bg-white rounded-3xl flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">
        {user ? `Logged in as ${user}` : "Log In to add events"}
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
      <button
        onClick={logInUser}
        className="p-2 w-30 border rounded-md cursor-pointer hover:bg-[#b4c8ff] transition-colors duration-200"
      >
        Log In
      </button>
    </div>
  );
}

export default LogIn;
