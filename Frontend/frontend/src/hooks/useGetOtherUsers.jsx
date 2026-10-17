import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../api";
import { setOtherUsers, setAuthUser } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await api.get("/api/v1/user/");
        dispatch(setOtherUsers(res.data));
      } catch (e) {
        console.log(e);
        // cookie expired but we still have a saved user -> send them back to login
        if (e.response?.status === 401) dispatch(setAuthUser(null));
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
