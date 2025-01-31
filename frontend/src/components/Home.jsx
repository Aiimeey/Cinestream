import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";

export default function Home() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };

  return (
    <Container>
      {isLoggedIn && !isVerified ? (
        <p className="text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified your account,{" "}
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to verify your account.
          </button>
        </p>
      ) : null}

{isLoggedIn && isVerified ? (
  <div className="relative ml-0 w-72 bg-eggshell rounded-xl p-4 space-y-6 shadow-sm shadow-gray-400 mt-16">
    <p className="text-lg font-semibold text-gray-800">My profile</p>
    <div className="flex items-center justify-center space-x-9">
      <div className="flex">
        <CiUser className="w-14 h-14 text-gray-700" />
      </div>
      <div>
        <p className="text-lg">{authInfo.profile.name}</p>
        <p className="text-sm text-gray-600">{authInfo.profile.email}</p>
      </div>
    </div>
  </div>
) : null}

<div className=" bg-gray-100 mt-16 ml-72"> {/* Add margin-top for space below navbar */}
  <div className="max-w-full mx-auto mt-10 px-4">
    <div className="flex justify-between space-x-4">

      <div className="w-1/4 relative">
        <img src="../movie1.jpg" alt=" " className="w-full h-64 object-contain rounded-lg" />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
          After
        </div>
      </div>

      <div className="w-1/4 relative">
        <img src="../movie2.jpg" alt=" " className="w-full h-64 object-contain rounded-lg" />
        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
          Wood
        </div>
      </div>

      <div className="w-1/4 relative">
        <img src="../movie3.jpg" alt=" " className="w-full h-64 object-contain rounded-lg" />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
          1917
        </div>
      </div>

      <div className="w-1/4 relative">
        <img src="../movie4.jpg" alt=" " className="w-full h-64 object-contain rounded-lg" />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
          Sully
        </div>
      </div>

    </div>
  </div>
</div>




    </Container>
  );
}
