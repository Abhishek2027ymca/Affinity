import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../api";
import { errorMessage } from "../utils/format";
import AuthLayout from "./AuthLayout";
import FormField from "./FormField";
import AlertDialog from "./AlertDialog";

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
  const [errorText, setErrorText] = useState("");
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (authUser) return <Navigate to="/" replace />;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmaPassword) {
      return setErrorText("Passwords do not match");
    }
    setLoading(true);
    try {
      const res = await api.post("/api/v1/user/register", user);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      setErrorText(errorMessage(error, "Could not reach the server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="New Account">
      <form onSubmit={onSubmitHandler} className={`flex flex-col gap-[8px] ${loading ? "cursor-wait" : ""}`}>
        <FormField
          label="Full Name"
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          required
        />
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
          autoComplete="new-password"
          required
        />
        <FormField
          label="Confirm Password"
          type="password"
          value={user.confirmaPassword}
          onChange={(e) => setUser({ ...user, confirmaPassword: e.target.value })}
          autoComplete="new-password"
          required
        />
        <label className="block">
          <span className="mb-[3px] block">
            <u>G</u>ender
          </span>
          <select
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            className="win-select w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <div className="win-divider my-[2px]" />

        <div className="flex items-center justify-between">
          <Link to="/login" className="win-link">
            Back to Sign On
          </Link>
          <button type="submit" disabled={loading} className="win-btn win-btn-default">
            {loading ? "Creating…" : "Create"}
          </button>
        </div>
      </form>

      {errorText && <AlertDialog message={errorText} onClose={() => setErrorText("")} />}
    </AuthLayout>
  );
};

export default Signup;
