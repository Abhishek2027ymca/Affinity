import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { setMessages } from "../redux/messageSlice";
import { clearUnread } from "../redux/uiSlice";

// loads the conversation with the selected user whenever the selection changes
const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const selectedId = selectedUser?._id;

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false; // ignore a slow response from a chat we already left

    dispatch(setMessages(null)); // show the loader instead of the previous chat
    dispatch(clearUnread(selectedId));

    api
      .get(`/api/v1/message/${selectedId}`)
      .then((res) => {
        if (!cancelled) dispatch(setMessages(res.data));
      })
      .catch((error) => {
        console.log(error);
        if (!cancelled) dispatch(setMessages([]));
      });

    return () => {
      cancelled = true;
    };
  }, [selectedId, dispatch]);
};

export default useGetMessages;
