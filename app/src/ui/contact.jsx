import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

export default function Contact() {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8" id="Contact">
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 md:mx-40"/>
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-900 font-semibold tracking-wide uppercase">Contact Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Get in Touch
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We'd love to hear from you! Whether you have a question about our platform, need assistance, or just want to give feedback, we're here to help.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                  <FaPhone size={30} />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Phone</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Call us at (123) 456-7890. We're available Monday to Friday from 9 AM to 6 PM.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                  <FaEnvelope size={30} />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Email</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Send us an email at contact@reebook.com. We'll get back to you within 24 hours.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                  <FaMapMarkerAlt size={30} />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Address</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Visit us at 123 Reebook Lane, Booktown, BK 12345. Our doors are open from 9 AM to 5 PM.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white">
                  <FiClock size={30} />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Hours</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our support team is available Monday to Friday, 9 AM to 6 PM. We're here to assist you with any inquiries.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}