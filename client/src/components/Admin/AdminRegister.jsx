import { FormControl, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });
  const signupHandle = async () => {
    await axios.post("http://localhost:3000/admin/signup", {
      username: admin.username,
      password: admin.password,
    });
    navigate("/admin/login");
  };

  return (
    <div
      style={{ padding: "20px" }}
      className="font-['Poppins'] flex justify-center items-center  flex-col gap-5 "
    >
      <div style={{ marginBottom: "20px" }}>
        <h1 className="font-['Poppins'] text-[90px] font-bold text-center text-black/70 ">
          Admin Register Page
        </h1>
      </div>
      <div className="font-['Poppins'] flex flex-col gap-5 h-[370px]   w-[350px] border-gray-300 border-2 p-8 rounded-lg shadow-lg">
        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input
            id="my-username"
            aria-describedby="my-helper-text"
            name="username"
            onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
          />
          <br />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">password</InputLabel>
          <Input
            type="password"
            id="my-password"
            aria-describedby="my-helper-text"
            name="password"
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
        </FormControl>

        <button
          className="font-['Poppins'] mt-6 bg-black text-white w-full h-[40px] font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-xl transition-all"
          onClick={signupHandle}
        >
          Sign Up
        </button>
        <h3 className="font-['Poppins'] mt-5">
          Already have an Account?
          <span
            onClick={() => {
              <Link to={"/admin/login"}></Link>;
            }}
            className="font-['Poppins'] text-green-400 cursor-pointer"
          >
            <Link to={"/login"}> Click here</Link>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default AdminRegister;
