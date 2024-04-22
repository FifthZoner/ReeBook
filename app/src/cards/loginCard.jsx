import React, { useState } from "react";
import hero from "../assets/book.png";


export default function loginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      console.log("Logged in");
    } catch (err) {
      setError("Wrong pass or login");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div>
      <div className="relative w-full max-w-3xl bg-purple-100 sm:rounded-lg sm:shadow-lg flex flex-col sm:flex-row items-center">
        <div className="w-1/2 sm:m-8 ">
          <img
            src={hero}
            alt=""
            className="w-full rounded-full shadow-lg p-2"
          />
        </div>

        <div className="w-1/2 sm:m-8">
          <div className="mt-4 text-center"></div>
          <h2 className="text-2xl font-semibold my-4 text-center">Sign In</h2>
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="email">Email:</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2 "
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950 my-2 transition duration-300"
            >
              Login
            </button>
          </form>
          {error && <p className=" text-center">{error}</p>}

          <p className="mt-4 text-gray-600 text-center">
            Not a member? Register now
          </p>
        </div>
      </div>
    </div>
  );
}