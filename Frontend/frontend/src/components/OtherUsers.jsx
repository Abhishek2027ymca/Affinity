import React from "react";
import { useSelector } from "react-redux";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";

const OtherUsers = ({ search = "" }) => {
  useGetOtherUsers();
  const { OtherUsers, OnLineUsers } = useSelector((store) => store.user);

  if (!OtherUsers) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="loading loading-spinner text-primary" />
      </div>
    );
  }

  const query = search.trim().toLowerCase();
  const isOnline = (user) => OnLineUsers?.includes(user._id);

  const users = OtherUsers.filter(
    (u) =>
      !query ||
      u.fullName.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query),
  )
    // online people first, then alphabetical
    .sort((a, b) => Number(isOnline(b)) - Number(isOnline(a)) || a.fullName.localeCompare(b.fullName));

  if (users.length === 0) {
    return (
      <p className="flex-1 px-6 pt-10 text-center text-sm text-slate-500">
        {query ? `No one matches "${search}"` : "No other users yet. Invite a friend to sign up!"}
      </p>
    );
  }

  return (
    <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-2">
      {users.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
