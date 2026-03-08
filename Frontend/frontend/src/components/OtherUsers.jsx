import React from "react";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  // my custom hooks
                         
  useGetOtherUsers();
  const { OtherUsers } = useSelector((store) => store.user);
  // early retiurn makesure iin react
  if (!OtherUsers) return null; // just return back if Other user is null

  return (
    <div className="overflow-auto  flex-1">
      {OtherUsers?.map((user) => {
        return (
          //pasw witha key
          <OtherUser key={user._id} user={user} />

             
        );
      })}
    </div>
  );
};

export default OtherUsers;
