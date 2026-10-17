import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import Background from "./Background";

const HomePage = () => {
  const { authUser, selectedUser } = useSelector((store) => store.user);

  // not logged in -> login page
  if (!authUser) return <Navigate to="/login" replace />;

  return (
    <Background>
      <div className="flex h-screen items-center justify-center p-0 md:p-6">
        <div className="panel flex h-full w-full max-w-6xl overflow-hidden bg-[#12121f]/70 shadow-2xl shadow-black/50 md:rounded-3xl">
          {/* on phones only one pane is visible at a time */}
          <div className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-80 md:shrink-0`}>
            <Sidebar />
          </div>
          <div className={`${selectedUser ? "flex" : "hidden md:flex"} min-w-0 flex-1`}>
            <MessageContainer />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default HomePage;
