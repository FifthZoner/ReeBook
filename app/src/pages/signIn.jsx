import * as React from "react";
import { useState, useEffect } from "react";
import hero from "../assets/library.jpg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
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
          passwordHash: password,
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
    <div className="bg-gradient-to-r from-orange-800 to-orange-700 min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-3xl p-8 bg-purple-100 rounded-lg shadow-lg flex flex-row">
        <div className="w-1/2">
          <img src={hero} alt="" className="w-full rounded-lg shadow-lg" />
        </div>

        <div className="w-1/2">
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
              className="w-full bg-orange-700 text-white py-2 rounded-md hover:bg-orange-800 my-2 transition duration-300"
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
