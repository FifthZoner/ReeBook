import * as React from "react";
import { useState, useEffect } from "react";
import Book3dCard from "../cards/book3dCard";


export default function SignUpSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  const [error, setError] = useState("");


  const handleRegister = async (e) => {
    
  };

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-zinc-800">
      <div className="bg-slate-700 text-white px-12 flex flex-wrap justify-center items-center rounded-3xl">
        <div>
          <Book3dCard />
        </div>
        <div>
          <form  onSubmit={handleRegister} className="flex flex-col justify-center items-center">
            <label htmlFor="email" >Login:</label>
            <input
              className="text-black"
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="text-black"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="passwordRep">Repeat password:</label>
            <input
              className="text-black"
              type="password"
              id="password"
              value={passwordRe}
              onChange={(e) => setPasswordRe(e.target.value)}
            />
            <label htmlFor="passwordRep">Email:</label>
            <input
              className="text-black"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
}
