import React from 'react'
import { FaHandshakeSimple } from "react-icons/fa6";
import { LuFolders } from "react-icons/lu";
import { GrMoney } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";


export default function About() {
  return (
    <div className="bg-white pb-12 px-4 sm:px-6 lg:px-8" id="About">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-900 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Reebook
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Reebook is a community-driven platform where book lovers can swap their books with each other. Our goal is to make reading accessible and affordable for everyone.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900  text-white">
                    <FaHandshakeSimple size={30}/>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy to Use</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Swap your books with ease using our user-friendly platform. Simply list the books you have and browse the books others are offering.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                <LuFolders size={30}/>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Wide Selection</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Explore a wide range of genres and find books that spark your interest. There's something for everyone!
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                    <FaPeopleGroup size={30}/>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Community Driven</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Join a vibrant community of book enthusiasts. Share your thoughts, reviews, and recommendations with fellow readers.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                <GrMoney size={30}/>

                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Affordable</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Save money by swapping books instead of buying new ones. Enjoy more books without breaking the bank.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
