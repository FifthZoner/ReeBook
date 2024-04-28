import React from "react";
import Sidebar from "../ui/sidebar";
import Lend from "../ui/lend";
import { SessionProvider } from '../hooks/SessionContext';

const Main = () => {
  return (
    <div>
      <SessionProvider>
        <Sidebar />
        <div className="md:pl-60 pl-16">
          <Lend />
        </div>
      </SessionProvider>
    </div>
  );
};

export default Main;
