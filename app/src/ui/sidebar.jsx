import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { BsFillCalendar2PlusFill } from "react-icons/bs";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        notify();
        throw new Error("Logout is not possible right now");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Error");
    }
  };

  const toggleClass = () => {
    setIsActive((isActive) => !isActive);
  };

  window.onresize = () => {
    setIsActive(false);
  };

  const offStyle = [
    `w-full h-1 absolute left-0 top-1/2 transform -translate-y-1/2 bg-white
    before:content-[''] before:left-0 before:w-full before:h-1 before:bg-black before:absolute
    before:-top-3 before:transition before:ease-in-out before:bg-white
    after:content-[''] after:left-0 after:w-full after:h-1 after:bg-black after:absolute
    after:top-3 after:transition after:transform after:ease-in-out after:bg-white`,
    `mr-4 py-4 px-0 list-none hidden md:flex text-white flex-col font-bold`,
    `md:hidden absolute pt-20 flex flex-col items-center justify-between text-4xl w-full h-3/4`,
    `fixed top-0 left-0 h-full z-50 w-16 md:w-60 font-bold text-xl text-white bg-none bg-purple-900`,
  ];

  const onStyle = [
    `w-full h-1 bg-transparent absolute left-0 top-1/2 transform -translate-y-1/2
    before:content-[''] before:left-0 before:w-full before:h-1 before:bg-black before:absolute
    before:-top-3 before:transition before:ease-in-out before:translate-y-3 before:-rotate-45 before:bg-white
    after:content-[''] after:left-0 after:w-full after:h-1 after:bg-black after:absolute
    after:top-3 after:transition after:transform after:ease-in-out after:-translate-y-3 after:rotate-45 after:bg-white`,
    `flex flex-col justify-around items-center text-3xl bg-purple-900 bg-opacity-90 ml-auto mr-4 py-4 px-0 list-none absolute top-0 left-0 content-center h-screen w-full`,
    `hidden`,
    `fixed top-0 left-0 h-full z-50 w-full md:w-60 font-bold text-xl text-white bg-purple-900`,
  ];

  return (
    <div className={isActive ? onStyle[3] : offStyle[3]}>
      <nav className="my-0 ml-auto flex flex-col">
        <img src={logo} className="md:w-12 md:h-12 md:m-4"></img>
        <ul className={isActive ? onStyle[1] : offStyle[1]}>
          <li className="p-1 m-1 md:ml-6 hover:border-l-4 border-purple-400 duration-150">
            <Link to="/books">Books</Link>
          </li>
          <li className="p-1 m-1 md:ml-6 hover:border-l-4 border-purple-400 duration-150">
            <Link to="/lent">
              <p>Lent</p>
            </Link>
          </li>
          <li className="p-1 m-1 md:ml-6 hover:border-l-4 border-purple-400 duration-150">
            <Link to="/borrowed">
              <p>Borrowed</p>
            </Link>
          </li>
          <li className="p-1 m-1 md:ml-6 hover:border-l-4 border-purple-400 duration-150">
            <Link to="/profile">
              <p>Profile</p>
            </Link>
          </li>
          <li
            className="p-1 m-1 md:ml-6 hover:border-l-4 border-purple-400 duration-150"
            onClick={handleLogout}
          >
            <Link to="#">
              <p>Logout</p>
            </Link>
          </li>
        </ul>
        <ul className={isActive ? onStyle[2] : offStyle[2]}>
          <li className="p-2 md:ml-6 ">
            <Link to="/books">
              <FaBook />
            </Link>
          </li>
          <li className="p-2 md:ml-6 ">
            <Link to="/lent">
              <BsFillCalendar2PlusFill />
            </Link>
          </li>
          <li className="p-2 md:ml-6">
            <Link to="/borrowed">
              <BsCalendarWeekFill />
            </Link>
          </li>
          <li className="p-2 md:ml-6">
            <Link to="/profile">
              <IoMdSettings />
            </Link>
          </li>
        </ul>
        <button
          className="p-4 cursor-pointer bg-transparent border-none md:hidden mr-auto"
          onClick={toggleClass}
        >
          <span className="inline-block relative w-8 h-6">
            <span className={isActive ? onStyle[0] : offStyle[0]}></span>
          </span>
        </button>
      </nav>
    </div>
  );
}
