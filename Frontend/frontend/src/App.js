import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import { addMessage } from "./redux/messageSlice";
import { incrementUnread, setTyping, resetUi } from "./redux/uiSlice";
import { API_URL } from "./api";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const store = useStore();

  // one socket connection for the whole time the user is logged in
  useEffect(() => {
    if (!authUser) return;

    const socket = io(API_URL, {
      query: { userId: authUser._id },
      withCredentials: true,
    });
    dispatch(setSocket(socket));

    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      // read live state from the store so the handler is never stale
      const { selectedUser, OtherUsers } = store.getState().user;
      if (selectedUser?._id === newMessage.senderId) {
        dispatch(addMessage(newMessage));
      } else {
        dispatch(incrementUnread(newMessage.senderId));
        const sender = OtherUsers?.find((u) => u._id === newMessage.senderId);
        toast(`${sender?.fullName || "New message"}: ${newMessage.message}`, {
          icon: "💬",
        });
      }
    });

    socket.on("typing", ({ from }) => dispatch(setTyping({ userId: from, isTyping: true })));
    socket.on("stopTyping", ({ from }) => dispatch(setTyping({ userId: from, isTyping: false })));

    return () => {
      socket.close();
      dispatch(setSocket(null));
      dispatch(resetUi());
    };
  }, [authUser?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  return <RouterProvider router={router} />;
}

export default App;
