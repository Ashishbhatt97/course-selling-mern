import {  FormControl, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AdminUsername } from "../store/selectors/adminUsername";
import { adminState } from "../store/atom/admin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const Adusername = useRecoilValue(AdminUsername);
  const adminLoginState = useSetRecoilState(adminState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = async () => {
    const res = await axios.post(
      `http://localhost:3000/admin/login`,
      { username: username, password: password },
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
        localStorage.setItem("Adtoken", res.data.token);
        adminLoginState(
          {
            adminUsername: res.data.username,
            isAdminLoading: false,
          },
          navigate("/admin/home")
        );
      }
    }
  };

  useEffect(() => {
    if (Adusername) {
      navigate("/admin/home");
    }
  }, [navigate, Adusername]);

  return (
    <div
      style={{ padding: "20px" }}
      className="font-['Poppins'] flex justify-center items-center  flex-col gap-5 "
    >
      <div>
        <h1 className="font-['Poppins'] text-[90px] font-bold text-center text-black/70 ">
          Admin Login Page
        </h1>
      </div>
      <div className="font-['Poppins'] flex flex-col gap-5 h-[370px]   w-[350px] border-gray-300 border-2 p-8 rounded-lg shadow-lg">

      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          id="my-inputUsername"
          aria-describedby="my-helper-text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">password</InputLabel>
        <Input
          type="password"
          id="my-inputpassword"
          aria-describedby="my-helper-text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <button className="font-['Poppins'] mt-6 bg-black text-white w-full h-[45px] font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-xl transition-all" onClick={loginHandle} >
        LOGIN
      </button>
      <h3>
        Don&apos;t have an Account?
        <span className="font-['Poppins'] text-green-400 cursor-pointer">
          <Link to={"/admin/register"}> Click here</Link>
        </span>
      </h3>
    </div>
    </div>
  );
};

export default AdminLogin;
