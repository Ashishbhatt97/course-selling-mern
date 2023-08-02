/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { userName } from "../store/selectors/username";
import { isLoading } from "../store/selectors/isLoading";
import Loading from "../Loading";

const Home = () => {
  const username = useRecoilValue(userName);
  const userLoading = useRecoilValue(isLoading);

  return (
    <>
      {userLoading ? (
        <Loading />
      ) : (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
          className="font-['Poppins'] h-full w-full p-[150px] flex flex-col justify-center items-center"
        >
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 1.2 }}
            className="font-['Poppins'] text-[50px] font-bold text-center text-[#807f7f]"
          >
            <motion.span className="font-['Poppins'] font-bold text-[100px]  text-violet-600">
              Hello ,{username}
            </motion.span>
            <br />
            Choose Your Favourite Tutorials
          </motion.h1>

          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-['Poppins'] flex justify-center gap-4 mt-5 w-full my-3"
          >
            <motion.button className="font-['Poppins']  bg-black text-white w-[250px] h-[55px] font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-xl transition-all">
              <Link to={"/showcourses"} style={{ textDecoration: "none" }}>
                Browse All Course
              </Link>
            </motion.button>
            <motion.button className="font-['Poppins']  bg-white text-black border-2 border-black w-[250px] h-[55px] font-semibold  rounded-xl transition-all">
              <Link to={"/purchased"} style={{ textDecoration: "none" }}>
                Purchased Course
              </Link>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
