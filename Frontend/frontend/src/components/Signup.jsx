import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; // need to istall reactdom and react-router-dom fro these
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  // taking input from user and storing in state
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmaPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) { // i f i get repsonse data s succes , naviagte to login page 
        //as the data is scuuccesfulty  piut in backend . go to login directly
        navigate("/Login"); // yes name is Login
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      
      console.log(error);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmaPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96  mx-auto">
      <div
        className="
h-full w-full bg-purple-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-100
  p-6  "
      >
        <h1 className="text-3xl font-bold  text-center text-gray-300">
          {" "}
          Signup Page{" "}
        </h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full  input-bordered h-10"
              type="text"
              placeholder=" Your Name"
            />
          </div>
          {/* 3 dic copies */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> UserName</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full  input-bordered h-10"
              type="text"
              placeholder=" UserName"
            />
          </div>

          {/* onemore */}

          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full  input-bordered h-10"
              type="password"
              placeholder=" Password"
            />
          </div>
          {/* confirmpassword  */}

          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Confirm Password </span>
            </label>
            <input
              value={user.confirmaPassword}
              onChange={(e) =>
                setUser({ ...user, confirmaPassword: e.target.value })
              }
              className="w-full  input-bordered h-10"
              type="password"
              placeholder=" Confirm Password"
            />
          </div>

          <div className="flex tems-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                onChange={() => handleCheckbox("male")}
                checked={user.gender === "male"}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                onChange={() => handleCheckbox("female")}
                checked={user.gender === "female"}
                type="checkbox"
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>

          <p className="text-center my-2">
            Already have an Account? <Link to="/Login">Login</Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-md mt-2 border  border-slate-700"
            >
              {" "}
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
