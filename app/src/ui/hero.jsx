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
        <button className=" text-2xl w-min bg-purple-900 my-6 py-1 px-8 rounded-lg border border-purple-950 font-semibold customShadow text-white">
          EXPLORE
        </button>
      </div>
    </div>
  );
};

export default Hero;
