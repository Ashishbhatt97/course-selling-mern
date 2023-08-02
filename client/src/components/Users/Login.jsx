/* eslint-disable no-unused-vars */
import {  FormControl, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();

  const loginHandle = async () => {
    const res = await axios.post(
      "http://localhost:3000/users/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data.token) {
      console.error(res.data.message);
      navigate("/admin/login");
    } else {
      if (res) {
        localStorage.setItem("token", res.data.token);
        setUserState({
          username: res.data.username,
          isLoading: false,
        });
        navigate("/user/home");
      }
    }
  };

  return (
    <div
      style={{ padding: "20px" }}
      className="font-['Poppins'] flex justify-center items-center  flex-col gap-5 "
    >
      <div>
        <h1 className="font-['Poppins'] text-[90px] font-bold text-center  text-black/70 ">
          User Login Page
        </h1>
      </div>
      <div className="font-['Poppins'] flex flex-col gap-5 h-[400px]   w-[350px] border-gray-300 border-2 p-8 rounded-lg shadow-lg">
        <FormControl>
          <label htmlFor="username" className="font-['Poppins'] text-black/25">
            Username
          </label>
          <Input
            id="my-InputUsername"
            aria-describedby="my-helper-text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
        </FormControl>
        <FormControl>
          <label htmlFor="password" className="font-['Poppins'] text-black/25">
            Password
          </label>
          <Input
            type="password"
            id="my-TextFieldpassword"
            aria-describedby="my-helper-text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <button
          className="font-['Poppins'] mt-6 bg-black text-white w-full h-[45px] font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-xl transition-all"
          onClick={loginHandle}
        >
          LOGIN
        </button>
        <h3>
          Don&apos;t have an Account?
          <span className="font-['Poppins'] text-green-400 cursor-pointer">
            <Link to={"/register"}> Click here</Link>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Login;
