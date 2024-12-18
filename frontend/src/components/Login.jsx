import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link , useNavigate } from "react-router-dom";
import url from "../url";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]= useState(false)

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${url}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "User Login Successfully");
      localStorage.setItem("jwt",data.token);
      navigateTo("/");
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User Login failed ");
    }
    setLoading(false)
  };

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type Email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semiold p-3"
              >
                {loading ? "Submitting":"Log in"}
              </button>
              <p className="mt-4 text-center text-gray-600">
                don't Have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
