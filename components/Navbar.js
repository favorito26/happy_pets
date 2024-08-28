"use client";
import React, { useState } from "react";
import LoginNavbar from "@/components/LoginNavbar";

const Navbar = () => {
  const [isLoginNavbarVisible, setIsLoginNavbarVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLoginNavbar = () => {
    setIsLoginNavbarVisible(!isLoginNavbarVisible);
    setIsMenuOpen(false); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsLoginNavbarVisible(false); 
  };

  return (
    <>
      <nav className="bg-nav sticky p-4 w-full shadow-md">
        <div className="flex">
          {/* Burger Icon for mobile */}
       

         
         <div className="flex items-center justify-center gap-5">
          

          {/* Switch for toggling LoginNavbar */}
          <div className="ml-auto flex items-center z-50">
            <label className="flex items-center relative cursor-pointer">
              <input
                type="checkbox"
                className="appearance-none cursor-pointer w-9 h-4 rounded-full bg-tertiary"
                checked={isLoginNavbarVisible}
                onChange={toggleLoginNavbar}
              />
              <span
                className={`w-4 h-4 absolute rounded-full transform transition-transform ${
                  isLoginNavbarVisible ? 'translate-x-full bg-secondary' : 'bg-secondary'
                }`}
              />
            </label>
          </div>


          {/* Logo */}
          <div className="text-white">
        <div className="mt-1 flex items-center">
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-row justify-center items-center">
              <h1 className="font-bold text-[15px] ml-3">Happy </h1>&nbsp;
              <h1 className="font-bold text-[15px]">Pets</h1>
              <img className="w-7 ml-3" src="dog.svg" alt="" />
            </div>
          </div>
        </div>
        </div>
        </div>


        <div className="lg:hidden ml-40 items-center justify-center">
            <button
              onClick={toggleMenu}
              className="text-gray-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
          </div>

          {/* Menu items for PC view */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:space-x-8 lg:flex-grow lg:justify-end lg:static top-full w-96 lg:w-auto bg-nav lg:shadow-none absolute text-center rounded-md pb-2 px-24`}
          >
            <a
              href="#"
              className="block text-gray-200 hover:text-gray-400 py-2 px-4 lg:py-0"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-200 hover:text-gray-400 py-2 px-4 lg:py-0"
            >
              About
            </a>
            <a
          
         
              href="#"
              className="block text-gray-200 hover:text-gray-400 py-2 px-4 lg:py-0"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

            
      <LoginNavbar isVisible={isLoginNavbarVisible} />
    </>
  );
};

export default Navbar;
