"use client";
import React from "react";

const LoginNavbar = ({ isVisible }) => {
  return (
    <div
      className={`sidebar fixed top-0 bottom-0 p-2 w-[300px] overflow-y-auto text-center bg-nav transform transition-transform duration-300 z-30 mt-16 ${
        isVisible ? "translate-x-0" : "-translate-x-[300px]"
      }`}
    >
     

      <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white w-60">
        <i className="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
        />
      </div>

      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i className="bi bi-house-door-fill"></i>
        <img src="paw.png" alt="" className="w-7" /> 
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
        All products
        </span>
      </div>

      <div className="my-4 bg-gray-600 h-[1px] w-60"></div>

      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
        <i className="bi bi-box-arrow-in-right"></i>
        <img src="paw.png" alt="" className="w-7" /> 
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          <a href="/register_page">Login</a>
        </span>
      </div>
    </div>
  );
};

export default LoginNavbar;
