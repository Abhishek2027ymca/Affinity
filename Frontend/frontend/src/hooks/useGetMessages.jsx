import axios from "axios";

import React, { useEffect } from "react";
import {useSelector} from "react-redux";

const useGetMessages = async () => {
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // as message fetch is a autheticated endpoitn ,uses auth middleware

        axios.defaults.withCredentials = true;

        // this id is dynamic
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`,
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages()
  }, []);
};

export default useGetMessages;
