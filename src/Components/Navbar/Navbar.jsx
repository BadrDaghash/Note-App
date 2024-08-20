import React, { createContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "./../../assets/imgs/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { noteAtom } from "../../Atoms/noteAtom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let navigate = useNavigate();
  let userToken = localStorage.getItem("userToken") || null;
  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  let [notesLength, setNotesLength] = useRecoilState(noteAtom);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-2   ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="w-full h-10 rounded-lg ms-6 sm:ms-20 "
              alt="Noted Logo"
            />
          </Link>
          {userToken && (
            <div className="relative p-1 group border-b-2 rounded-md">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-[#00796f] group-hover:text-[#00796fbb] duration-300 transition-colors"
              />
              <span className="absolute top-[-6px] left-[8px] font-semibold text-xs text-green-700 group-hover:text-[#00796fbb] duration-300 transition-colors">
                {notesLength}
              </span>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 me-7 justify-center text-sm text-[#00796f] rounded-lg md:hidden bg-white border-b-2 hover:text-white"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block sm:me-20 md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border items-center border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-3 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {!userToken && (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) => {
                        return isActive
                          ? "nav block text-white bg-[#00796f] "
                          : "nav text-[#00796f] bg-white";
                      }}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => {
                        return isActive
                          ? "nav block text-white bg-[#00796f] "
                          : "nav text-[#00796f] bg-white";
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {userToken && (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => {
                        return isActive
                          ? "nav block text-white bg-[#00796f] "
                          : "nav text-[#00796f] bg-white";
                      }}
                      onClick={logOut}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
