import React from "react";
import hero from "../assets/library.jpg";

const heroImg = {
  backgroundImage: `url(${hero})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
};

const Hero = () => {
  return (
    <div
      style={heroImg}
      className=" min-h-screen bg-black bg-opacity-60 bg-blend-darken flex flex-wrap"
    >
      <div className=" lg:w-2/3 lg:p-40 flex flex-col justify-center items-center mx-auto">
        <h1 className=" text-[4rem] font-bold text-white my-2">ReeBook</h1>
        <p className=" text-white text-3xl text-center lg:w-[600px] text-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          corrupti, adipisci itaque
        </p>
        <button className=" text-2xl w-min bg-yellow-300 my-6 py-1 px-8 rounded-xl font-bold customShadow">
          Explore
        </button>
      </div>
      <div className="hidden lg:flex w-1/3 bg-black bg-opacity-20 rounded-3xl p-12  flex-col flex-1 gap-8 backdrop-blur-[3px] drop-shadow-xl max-h-full justify-center">
        <div className=" bg-white rounded-2xl p-6 flex flex-row">
          <img src={hero} alt="" className=" w-28 h-28 rounded-xl" />
          <div className="flex flex-col flex-wrap mx-4 my-2">
            <h1 className=" font-bold text-xl">Book name</h1>
            <p className=" text-gray-400">Tags</p>
            <div className=" flex flex-row gap-2 py-2">
              <button className="bg-white drop-shadow-xl py-1 px-3 rounded-md ">
                Info
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-2xl p-6 flex flex-row">
          <img src={hero} alt="" className=" w-28 h-28 rounded-xl" />
          <div className="flex flex-col flex-wrap mx-4 my-2">
            <h1 className=" font-bold text-xl">Book name</h1>
            <p className=" text-gray-400">Tags</p>
            <div className=" flex flex-row gap-2 py-2">
              <button className="bg-white drop-shadow-lg py-1 px-3 rounded-md">
                Info
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-2xl p-6 flex flex-row">
          <img src={hero} alt="" className=" w-28 h-28 rounded-xl" />
          <div className="flex flex-col flex-wrap mx-4 my-2">
            <h1 className=" font-bold text-xl">Book name</h1>
            <p className=" text-gray-400">Tags</p>
            <div className=" flex flex-row gap-2 py-2">
              <button className="bg-white drop-shadow-lg py-1 px-3 rounded-md">
                Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
