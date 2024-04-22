import * as React from "react";
import LoginCard from "../cards/loginCard";
import RegisterCard from "../cards/registerCard";


export default function SignInSide() {

  return (
    <div className="bg-purple-100 sm:bg-gradient-to-tr from-purple-900 to-purple-950 min-h-screen flex items-center justify-center">
      <LoginCard />
      <RegisterCard />
    </div>
  );
}
