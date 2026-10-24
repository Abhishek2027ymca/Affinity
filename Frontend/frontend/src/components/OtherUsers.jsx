import React from "react";
import { useSelector } from "react-redux";
import OtherUser from "./OtherUser.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";

// sunken list box; the inner div scrolls so the bevel stays put
const ListBox = ({ children }) => (
  <div className="win-sunken min-h-0 flex-1 p-[2px]">
    <div className="h-full overflow-y-auto py-[2px]">{children}</div>
  </div>
);

const Group = ({ label, users }) => (
  <>
    <p className="flex h-[18px] items-center gap-[3px] px-[2px] font-bold">
      <span aria-hidden="true">▾</span>
      {label} ({users.length})
    </p>
    {users.map((user) => (
      <OtherUser key={user._id} user={user} />
    ))}
  </>
);

const OtherUsers = ({ search = "" }) => {
  useGetOtherUsers();
  const { OtherUsers, OnLineUsers } = useSelector((store) => store.user);

  if (!OtherUsers) {
    return (
      <ListBox>
        <p className="px-[4px] text-win-gray">Loading buddies…</p>
      </ListBox>
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
      <ListBox>
        <p className="px-[4px] text-win-gray">
          {query ? `No one matches "${search}"` : "No other users yet. Invite a friend to sign up!"}
        </p>
      </ListBox>
    );
  }

  return (
    <ListBox>
      <Group label="Online" users={users.filter(isOnline)} />
      <Group label="Offline" users={users.filter((u) => !isOnline(u))} />
    </ListBox>
  );
};

export default OtherUsers;
