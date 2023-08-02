import { FormControl, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
  const signupHandle = async () => {
    await axios.post("http://localhost:3000/users/signup", {
      username: username,
      password: password,
    });
    navigate('/login')
  };

  return (
    <div
      style={{ padding: "20px" }}
      className="font-['Poppins'] flex justify-center items-center  flex-col gap-5 "
    >
      <div style={{ marginBottom: "20px" }}>
        <h1 className="font-['Poppins'] text-[90px] font-bold text-center text-black/70 ">
          User Register Page
        </h1>
      </div>
      <div className="font-['Poppins'] flex flex-col gap-5 h-[400px]   w-[350px] border-gray-300 border-2 p-8 rounded-lg shadow-lg">
        <FormControl>
          <label htmlFor="password" className="font-['Poppins'] text-black/25">
            Username
          </label>
          <Input
            id="my-username"
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
            id="my-password"
            aria-describedby="my-helper-text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <button
          className="font-['Poppins'] mt-6 bg-black text-white w-full h-[45px] font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-xl transition-all"
          onClick={signupHandle}
        >
          REGISTER
        </button>

        <h3>
          Already have an Account?
          <span
            onClick={() => {
              <Link to={"/login"}></Link>;
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

export default Register;
