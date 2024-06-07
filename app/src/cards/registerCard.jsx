import React, { useState } from "react";
import book from "../assets/book.png";

export default function registerCard({toggleLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [passwordRe, setPasswordRe] = useState("");
    const [error, setError] = useState("");
  
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            nickname: login,
          }),
        });
        if (!response.ok) {
          throw new Error("Login failed");
        }
        console.log("Logged in")
      } catch (err) {
        setError("Wrong pass or login");
      }
    };

  return (
    <div>
      <div className="relative w-full max-w-3xl bg-purple-100 sm:rounded-lg sm:shadow-lg flex flex-col sm:flex-row items-center">
        <div className="w-1/2 sm:m-8">
          <h2 className="text-2xl font-semibold my-4 text-center">Sign Up</h2>
          <div>
            <form
              onSubmit={handleRegister}
              className="flex flex-col justify-center items-center"
            >
              <label htmlFor="email">Login:</label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2"
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label htmlFor="password">Password:</label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="passwordRep">Repeat password:</label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2"
                type="password"
                id="passwordRe"
                value={passwordRe}
                onChange={(e) => setPasswordRe(e.target.value)}
              />
              <label htmlFor="passwordRep">Email:</label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950 my-2 transition duration-300"
              >
                Register
              </button>
            </form>
            {error && <p className=" text-center">{error}</p>}
          </div>

          <p className="mt-4 text-gray-600 text-center">
            Already have an account? <span className="text-purple-900 underline cursor-pointer" onClick={toggleLogin}>Login</span>
          </p>
        </div>
        <div className="w-1/2 sm:m-8 ">
          <img
            src={book}
            alt=""
            className="w-full rounded-full shadow-lg p-2"
          />
        </div>
      </div>
    </div>
  );
}
