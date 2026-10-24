import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api";
import { errorMessage } from "../utils/format";
import { setAuthUser } from "../redux/userSlice";
import AuthLayout from "./AuthLayout";
import FormField from "./FormField";
import AlertDialog from "./AlertDialog";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // already logged in -> straight to the chat
  if (authUser) return <Navigate to="/" replace />;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/v1/user/login", user);
      dispatch(setAuthUser(res.data));
      navigate("/");
    } catch (error) {
      setErrorText(errorMessage(error, "Could not reach the server"));
      setUser((u) => ({ ...u, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign On">
      <form onSubmit={onSubmitHandler} className={`flex flex-col gap-[8px] ${loading ? "cursor-wait" : ""}`}>
        <FormField
          label="Screen Name"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          autoComplete="username"
          required
        />
        <FormField
          label="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          autoComplete="current-password"
          required
        />

        {/* decorative, like the rest of the AIM chrome */}
        <div className="flex gap-[16px]">
          <label className="flex items-center gap-[5px]">
            <input type="checkbox" className="win-check" defaultChecked />
            Save password
          </label>
          <label className="flex items-center gap-[5px]">
            <input type="checkbox" className="win-check" />
            Auto-login
          </label>
        </div>

        <div className="win-divider my-[2px]" />

        <div className="flex items-center justify-between">
          <Link to="/register" className="win-link">
            Get a Screen Name
          </Link>
          <button type="submit" disabled={loading} className="win-btn win-btn-default">
            {loading ? "Signing On…" : "Sign On"}
          </button>
        </div>
      </form>

      {errorText && <AlertDialog message={errorText} onClose={() => setErrorText("")} />}
    </AuthLayout>
  );
};

export default Login;
