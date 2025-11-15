import React, { useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const cleanMessage = err.code ? err.code.replace("auth/", "") : "error";
      setError(cleanMessage);
    }
  };
  return (
    <>
      <div className="max-w-md w-full p-6 bg-gray-800 rounded shadow border border-gray-700 text-gray-300">
        <h2 className="text-xl font-semibold mb-4">{isSignup ? "Create Account" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button style={{ backgroundColor: '#40E0D0', color: 'black' }} className="bg-indigo-600 text-white w-full py-2 rounded ">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="mt-3 text-sm text-indigo-600 underline"
        >
          {isSignup ? "Already have an account? Login" : "Create new account"}
        </button>
      </div>

    </>
  )
}

export default Auth
