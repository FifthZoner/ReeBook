import { useState } from "react"
import { Link } from "react-router-dom";

export default function Sidebar(){
    const [isActive, setIsActive] = useState(false);

    function toggleClass(){
        if (isActive)
            setIsActive(false);
        else
            setIsActive(true);
    }
    
    window.onresize = () => {
        setIsActive(false);
    }

    const offStyle = [`w-full h-1 absolute left-0 top-1/2 transform -translate-y-1/2 bg-white
    before:content-[''] before:left-0 before:w-full before:h-1 before:bg-black before:absolute
    before:-top-3 before:transition before:ease-in-out before:bg-white
    after:content-[''] after:left-0 after:w-full after:h-1 after:bg-black after:absolute
    after:top-3 after:transition after:transform after:ease-in-out after:bg-white`,
    ` mr-4 py-4 px-0 list-none hidden md:flex flex-col text-purple-400 font-bold`];

    const onStyle = [`w-full h-1 bg-transparent absolute left-0 top-1/2 transform -translate-y-1/2
    before:content-[''] before:left-0 before:w-full before:h-1 before:bg-black before:absolute
    before:-top-3 before:transition before:ease-in-out before:translate-y-3 before:-rotate-45 before:bg-white
    after:content-[''] after:left-0 after:w-full after:h-1 after:bg-black after:absolute
    after:top-3 after:transition after:transform after:ease-in-out after:-translate-y-3 after:rotate-45 after:bg-white`,
    `flex flex-col justify-around text-3xl bg-purple-900 bg-opacity-90 ml-auto mr-4 py-4 px-0 list-none absolute top-0 left-0 content-center h-screen w-full`];

return(
    <div className="absolute top-0 left-0 h-full z-50 w-1/6 font-bold text-xl text-white bg-purple-900">
        <nav className="my-0 ml-auto flex flex-col">
            <span className="py-4 pl-4 hidden md:block text-purple-">LOGO</span>
                <ul className={isActive ?  onStyle[1] : offStyle[1] }>
                    <li className="p-1 md:ml-6 "><Link to="#">Books</Link></li>
                    <li className="p-1 md:ml-6 "><Link to="#">Overview</Link></li>
                    <li className="p-1 md:ml-6 "><Link to="#">Rent</Link></li>
                    <li className="p-1 md:ml-6"><Link to="#">Lend</Link></li>
                    <li className="p-1 md:ml-6"><Link to="#">History</Link></li>
                    <li className="p-1 md:ml-6"><Link to="#">Settings</Link></li>
                </ul>
            <button className="p-4 cursor-pointer bg-transparent border-none md:hidden ml-auto" onClick={toggleClass}>
                <span className="inline-block relative w-8 h-6">
                    <span className={isActive ?  onStyle[0] : offStyle[0]}></span>
                </span>
            </button>
        </nav>
    </div>
)};