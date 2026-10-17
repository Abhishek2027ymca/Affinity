import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiLock } from "react-icons/fi";
import api from "../api";
import { errorMessage } from "../utils/format";
import { setAuthUser } from "../redux/userSlice";
import AuthLayout from "./AuthLayout";
import FormField from "./FormField";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
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
      toast.error(errorMessage(error, "Could not reach the server"));
      setUser((u) => ({ ...u, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your conversations"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <FormField
          label="Username"
          icon={FiUser}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="your username"
          autoComplete="username"
          required
        />
        <FormField
          label="Password"
          icon={FiLock}
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        <button type="submit" disabled={loading} className="btn-brand mt-2">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
