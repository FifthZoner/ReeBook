import * as React from "react";
import { useState } from "react";
import LoginCard from "../cards/loginCard";


export default function SignInSide() {

  return (
    <div className="bg-purple-100 sm:bg-gradient-to-tr from-purple-900 to-purple-950 min-h-screen flex items-center justify-center">
      <LoginCard />
    </div>
  );
}
