import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
        <form action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Full Name</span>
            </label>
            <input
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
              className="w-full  input-bordered h-10"
              type="password"
              placeholder=" Confirm Password"
            />
          </div>

          <div className="flex tems-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input type="checkbox" defaultChecked className="checkbox mx-2" />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input type="checkbox" defaultChecked className="checkbox mx-2" />
            </div>
          </div>

          <p className="text-center my-2">
            Already have an Account? <Link to="/Login">Login</Link>
          </p>

          <div>
            <button className="btn btn-block btn-sm mt-2 border  border-slate-700">
              {" "}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
