import axios from "axios";

import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = async () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // as message fetch is a autheticated endpoitn ,uses auth middleware

        axios.defaults.withCredentials = true;

        // this id is dynamic
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`,
        );
        console.log(res);
        dispatch(setMessages(res.data))
        
    



      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages()
  }, [selectedUser]);
};

export default useGetMessages;
