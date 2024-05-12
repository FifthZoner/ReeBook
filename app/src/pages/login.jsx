import * as React from "react";
import LoginCard from "../cards/loginCard";
import RegisterCard from "../cards/registerCard";
import { useState } from "react";


export default function SignInSide() {

  const [isSigningIn, setIsSigningIn] = useState(true);

  const toggleSignIn = () => {
    setIsSigningIn(!isSigningIn);
  };

  return (
    <div className="bg-purple-100 sm:bg-gradient-to-tr from-purple-900 to-purple-950 min-h-screen flex items-center justify-center">
      {isSigningIn && <LoginCard toggleLogin={toggleSignIn} />}
      {!isSigningIn && <RegisterCard toggleLogin={toggleSignIn} />}
    </div>
  );
}
