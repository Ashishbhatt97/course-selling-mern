/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Home from "./components/Users/Home";
import Login from "./components/Users/Login";
import Purchased from "./components/Users/Purchased";
import Register from "./components/Users/Register";
import ShowCourses from "./components/Users/ShowCourses";
import AdminRegister from "./components/Admin/AdminRegister";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import AddCourse from "./components/Admin/AddCourse";
import AboutCourse from "./components/Admin/AboutCourse";
import { motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoading } from "./components/store/selectors/isLoading";
import { userState } from "./components/store/atom/user";
import { useEffect } from "react";
import axios from "axios";
import { adminState } from "./components/store/atom/admin";
import { AdminLoading } from "./components/store/selectors/AdminLoading";
import { Uifront } from "./components/Uifront";
import ShowAllCourses from "./components/Users/ShowAllCourses";
import Loading from "./components/Loading";

function App() {
  const userLoading = useRecoilValue(isLoading);
  const adminLoading = useRecoilValue(AdminLoading);
  const setUserState = useSetRecoilState(userState);
  const setAdminState = useSetRecoilState(adminState);
  const params = useParams();
  const navigate = useNavigate();

  const SignOutHandle = () => {
    setUserState({
      isLoading: true,
      username: null,
    });
    setAdminState({
      isAdminLoading: true,
      adminUsername: null,
    });
  };

  const getUserRes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")} `,
        },
      });
      const Username = res.data.username;
      if (!Username) {
        setUserState({
          username: null,
          isLoading: true,
        });
      }

      if (Username) {
        setUserState({
          username: Username,
          isLoading: false,
        });
      }
    } catch (error) {
      if (error) {
        setUserState({
          username: null,
          isLoading: true,
        });
      }
    }
  };

  const getAdminRes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      });
      const adUsername = res.data.username;
      if (!adUsername) {
        setAdminState({
          adminUsername: null,
          isAdminLoading: true,
        });
      }

      if (adUsername) {
        setAdminState({
          adminUsername: adUsername,
          isAdminLoading: false,
        });
      }
    } catch (err) {
      if (err) {
        setAdminState({
          adminUsername: null,
          isAdminLoading: true,
        });
      }
    }
  };

  useEffect(() => {
      getAdminRes();
      getUserRes();
  }, []);

  return (
    <>
      <motion.div
        className="font-['Poppins'] shadow-lg"
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "end",
          alignContent: "center",
        }}
      >
        <div className="font-['Poppins'] w-full flex justify-between items-center ">
          <button
            className="font-['Poppins']  h-8 w-[180px] px-20 text-black font-medium justify-start items-center flex rounded-md cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </div>

        {userLoading === true && adminLoading === true ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
            className="font-['Poppins'] flex justify-center items-center gap-2 px-3"
          >
            <motion.button className="font-['Poppins']  bg-black text-white w-[120px] h-[45px] font-medium hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-2xl transition-all">
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                User Login
              </Link>
            </motion.button>

            <div className="font-['Poppins'] flex justify-end items-center gap-5 px-3">
              <motion.button className="font-['Poppins']  bg-[#e2e2e2] border-2  border-black font-medium text-stone-950 w-[120px] h-[45px] rounded-2xl transition-all">
                <Link to={"/admin/login"} style={{ textDecoration: "none" }}>
                  Admin Login
                </Link>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="font-['Poppins'] flex justify-end items-center gap-5 px-3 ">
              {!userLoading && (
                <>
                  {params !== "purchased" && (
                    <motion.button className="font-['Poppins']  bg-black text-white w-[180px] h-[45px] font-medium  rounded-lg transition-all">
                      <Link
                        to={"/purchased"}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Purchased Courses
                      </Link>
                    </motion.button>
                  )}
                  {params !== "showcourses" && (
                    <motion.button className="font-['Poppins']  bg-black text-white w-[180px] h-[45px] font-medium  rounded-lg transition-all">
                      <Link
                        to={"/showcourses"}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Available Courses
                      </Link>
                    </motion.button>
                  )}
                </>
              )}
              {!adminLoading && (
                <motion.button className="font-['Poppins']  bg-black text-white w-[150px] h-[45px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-lg transition-all">
                  <Link to={"/admin/home"} style={{ textDecoration: "none" }}>
                   Admin Home
                  </Link>
                </motion.button>
              )}

              <motion.button
                className="font-['Poppins']  bg-black text-white w-[120px] h-[45px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-lg transition-all shadow-lg"
                onClick={() => {
                  localStorage.setItem("token", null),
                    localStorage.setItem("Adtoken", null);
                }}
              >
                <Link
                  to={"/"}
                  style={{ textDecoration: "none" }}
                  onClick={SignOutHandle}
                >
                  Sign Out
                </Link>
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
      <Routes>
        <Route exact path="/" Component={Uifront} />
        <Route exact path="/user/home" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/purchased" Component={Purchased} />
        <Route path="/register" Component={Register} />
        <Route path="/courses" Component={ShowAllCourses} />
        <Route path="/showcourses" Component={ShowCourses} />
        <Route path="/admin/register" Component={AdminRegister} />
        <Route path="/admin/login" Component={AdminLogin} />
        <Route path="/admin/home" Component={AdminHome} />
        <Route path="/admin/courses" Component={AddCourse} />
        <Route path="/admin/courses/:courseId" Component={AboutCourse} />
        <Route path="/loading" Component={Loading} />
      </Routes>
    </>
  );
}

export default App;
