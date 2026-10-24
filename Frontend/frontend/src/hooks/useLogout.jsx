import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { setAuthUser } from "../redux/userSlice";

// shared by "Sign Off" and the window's × button
const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    try {
      const res = await api.get("/api/v1/user/logout");
      toast.success(res.data.message);
    } catch (e) {
      console.log(e);
    } finally {
      // always leave, even if the request failed
      dispatch(setAuthUser(null));
      navigate("/login");
    }
  };
};

export default useLogout;
