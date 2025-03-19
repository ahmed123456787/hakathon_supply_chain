import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import {
  UserRound,
  ShoppingCart,
  CircleUser,
  Box,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
function Header({ cartCount, onCartClick }) {
  const PrincipleLinks = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Shop",
      link: "/Shop",
    },
    { id: 3, name: "Support", link: "Support" },
  ];
  const DropdownLinks = [
    {
      id: 1,
      name: "Profile",
      logo: <CircleUser />,
      link: "/#",
    },
    {
      id: 2,
      name: "Orders",
      logo: <Box />,
      link: "/orders",
    },
    {
      id: 3,
      name: "Settings",
      logo: <Settings />,
      link: "/#",
    },
    {
      id: 4,
      name: "Logout",
      logo: <LogOut />,
      link: "/#",
    },
  ];
  return (
    <div className="bg-neutral-800 text-white flex justify-between items-center">
      <div className="w-[15%]">
        <img src={Logo} alt="" className="p-2" />
      </div>
      <div className="w-[15%] ">
        <ul className="flex justify-between items-center">
          {PrincipleLinks.map((data) => (
            <Link to={data.link} key={data.id}>
              <li key={data.id} className="cursor-pointer">
                {data.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-[19%] flex justify-between  p-2">
        <div
          onClick={onCartClick}
          className="flex justify-center items-center space-x-2 w-[50%] cursor-pointer"
<<<<<<< HEAD
          onClick={() => setIsModalOpen(true)}
=======
>>>>>>> 614d5397b266dec6f78f4b01a8afc3aac9445fe0
        >
          <ShoppingCart />
          <p className="">
            Card {"  "}
            <span
              className={`${
                cartCount > 0 ? "bg-red-500 text-white rounded-lg" : "hidden"
              } rounded-2xl p-2`}
            >
              {cartCount}
            </span>
          </p>
        </div>
        <div className="w-[50%] relative group cursor-pointer">
          <div className="flex justify-center items-center space-x-2">
            <UserRound />
            <p>My Account</p>
          </div>
          <div className="absolute z-50 hidden group-hover:block w-[150px] bg-white text-black rounded-lg top-6 right-2 shadow-lg">
            <ul>
              {DropdownLinks.map((data) => (
                <li
                  key={data.id}
                  className="hover:bg-gray-300 rounded-lg flex p-2 items-center"
                >
                  {data.logo}
                  <a href={data.link} className="ml-2">
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
