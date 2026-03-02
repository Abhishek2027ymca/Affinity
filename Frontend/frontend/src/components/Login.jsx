

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react"; // need to istall reactdom and react-router-dom fro these

const Login = () => {


  const [user, setUser] = useState({
 
    username: "",
    password: "",
    
  });

 

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    // after submitting my fildes s will be emptied
    setUser({
      
      username: "",
      password: "",
      
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
          Login {" "}
        </h1>
        <form  onSubmit = {onSubmitHandler}  action="">
         {/* no need of gull name  */}
          {/* 3 dic copies */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> UserName</span>
            </label>
            <input
             value={user.username}
              onChange={(e) => setUser({ ...user, username:e.target.value })}
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

         {/* no nrrd of comgim password  */}

          {/* no need of checkbox  */}

          <p className="text-center my-2">
            Don't  have an Account? <Link to="/register">Signup</Link> 
            {/* any error here  */}
          </p>

          <div>
            <button  type = "submit" className="btn btn-block btn-md mt-2 border  border-slate-700">
              {" "}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
