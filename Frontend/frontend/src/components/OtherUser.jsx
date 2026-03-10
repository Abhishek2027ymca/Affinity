import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser  , setOnlineUsers  } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, OnLineUsers } = useSelector((store)=>store.user);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
    // You could log or fetch chat info here if needed
  };

  const isOnline =   OnLineUsers.includes(user._id);

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-600" : ""
        } flex gap-2 items-center text-slate-300 hover:bg-gray-600 rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-2 flex-1 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;