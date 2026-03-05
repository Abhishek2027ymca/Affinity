import React from "react";
import axios from "axios";
import { useEffect } from "react";

const useGetOtherUsers = () => {
  // we sue useeffect

  
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true ;// very import line other wise you will get CORS error 
        const res = await axios.get("http://localhost:8080/api/v1/user/");
        console.log(res);
        // now store these in store of redux 
        

        
      } catch (e) {
        console.log(e);
      }

    };
    fetchOtherUsers(); // jaise heen homeseceren par vist akru ,  data fetch ho jaaye
  }, []);
};

export default useGetOtherUsers;
