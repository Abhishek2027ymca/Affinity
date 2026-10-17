import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FiUser, FiLock, FiAtSign } from "react-icons/fi";
import api from "../api";
import { errorMessage } from "../utils/format";
import AuthLayout from "./AuthLayout";
import FormField from "./FormField";

const emptyForm = {
  fullName: "",
  username: "",
  password: "",
  confirmaPassword: "", // spelling matches the backend field
  gender: "male",
};

const Signup = () => {
  const [user, setUser] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (authUser) return <Navigate to="/" replace />;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmaPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const res = await api.post("/api/v1/user/register", user);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(errorMessage(error, "Could not reach the server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Affinity and start chatting in seconds"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-violet-400 hover:text-violet-300">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <FormField
          label="Full name"
          icon={FiUser}
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          placeholder="Your name"
          required
        />
        <FormField
          label="Username"
          icon={FiAtSign}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="pick a username"
          autoComplete="username"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="Password"
            icon={FiLock}
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••"
            autoComplete="new-password"
            required
          />
          <FormField
            label="Confirm"
            icon={FiLock}
            type="password"
            value={user.confirmaPassword}
            onChange={(e) => setUser({ ...user, confirmaPassword: e.target.value })}
            placeholder="••••••"
            autoComplete="new-password"
            required
          />
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Gender
          </span>
          <div className="grid grid-cols-2 gap-3">
            {["male", "female"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setUser({ ...user, gender: g })}
                className={`h-11 rounded-xl border text-sm font-medium capitalize transition ${
                  user.gender === g
                    ? "border-violet-400/70 bg-violet-500/20 text-white"
                    : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-brand mt-2">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
