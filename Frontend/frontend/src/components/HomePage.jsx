import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import TitleBar from "./TitleBar";
import Taskbar from "./Taskbar";
import useLogout from "../hooks/useLogout";
import { selectOnlineCount } from "../redux/userSlice";

const MENU = ["File", "Edit", "View", "People", "Help"];

const HomePage = () => {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const onlineCount = useSelector(selectOnlineCount);
  const isTyping = useSelector((store) => !!store.ui.typing[selectedUser?._id]);
  const logoutHandler = useLogout();

  // not logged in -> login page
  if (!authUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 md:p-4">
        <div className="win-raised flex h-full flex-col p-[3px]">
          <TitleBar
            title={
              selectedUser
                ? `Affinity — Instant Message with ${selectedUser.fullName}`
                : "Affinity — Buddy List"
            }
            onClose={logoutHandler}
            closeLabel="Sign Off"
          />

          {/* menu bar (decorative) */}
          <div className="flex h-[20px] items-center">
            {MENU.map((item) => (
              <span key={item} className="px-[6px]">
                <u>{item[0]}</u>
                {item.slice(1)}
              </span>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 gap-[6px] px-[4px] pb-[4px] pt-[2px]">
            {/* on phones only one pane is visible at a time */}
            <div className={`${selectedUser ? "hidden md:flex" : "flex"} w-full md:w-[232px] md:shrink-0`}>
              <Sidebar />
            </div>
            <div className={`${selectedUser ? "flex" : "hidden md:flex"} min-w-0 flex-1`}>
              <MessageContainer />
            </div>
          </div>

          {/* status bar */}
          <div className="flex gap-[2px]">
            <p className="win-status shrink-0 px-[4px] leading-[20px] md:w-[238px]">
              {onlineCount} {onlineCount === 1 ? "buddy" : "buddies"} online
            </p>
            <p className="win-status min-w-0 flex-1 truncate px-[4px] leading-[20px]">
              {isTyping ? `${selectedUser.fullName} is typing…` : "Ready"}
            </p>
          </div>
        </div>
      </div>

      <Taskbar imWith={selectedUser?.fullName} />
    </div>
  );
};

export default HomePage;
