import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers , setAuthUser} from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { OtherUsers: otherUsersData } = useSelector((store) => store.user);
  // otherUsersData is done by me 

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/logout`);
      console.log(res);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (e) {
      console.log(e);
    }
  };

  const searchSubmitHandler = (e) => {
    // to stop reload
    e.preventDefault();
    const conversationUser = otherUsersData?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }    
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md "
          type="text"
          placeholder="Search..."
        />

        <button type="submit" className="btn  bg-zinc-500 text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none"> </BiSearchAlt2>
        </button>
      </form>
      {/* complete  serach abr */}

      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button className="btn btn-sm bg-slate-50" onClick={logoutHandler}>
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
