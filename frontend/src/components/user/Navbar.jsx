import React from "react";
import Container from "../Container";
import{CiLogin} from 'react-icons/ci'
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function Navbar() {
  const { authInfo, handleLogout  } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-eggshell opacity-95 shadow-sm shadow-gray-400">
      <Container className="p-2">
        <div className="flex justify-between items-center">
        <Link to="/">
            <img src="../logo.png" alt=" " className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <input
                type="text"
                className="w-64 border-2 border-dark-subtle p-1 rounded bg-transparent text-base outline-none focus:border-off-white text-gray-600"
                placeholder="search..." 
              />
            </li>
            {isLoggedIn ? (
                <button onClick={handleLogout} className="text-gray-600 font-semibold text-lg">
                  Log out
                </button>
              ) : 
              (
            <ul className="px-3 flex items-center gap-x-2">
            <Link className="flex justify-between items-center space-x-2" to="/auth/signin">
            <CiLogin className='text-gray-500' size={24} />
            <li className=" text-gray-600 font-semibold text-lg cursor-pointer">
              Login
            </li>
            </Link>
            </ul>
            )}
            </ul>
        </div>
      </Container>
    </div>
  );
}
