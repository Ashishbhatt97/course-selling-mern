import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { AdminUsername } from "../store/selectors/adminUsername";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const username = useRecoilValue(AdminUsername);
  const navigate = useNavigate();
  return (
    <>
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
          className="font-['Poppins'] text-[50px] font-bold text-center text-slate-200"
        >
          <motion.span className="font-['Poppins'] font-bold text-[100px]  text-violet-600">
            Hey There, {username}
          </motion.span>
          <br />
          <motion.button
            whileHover={{ scale: 1.02 }}
            initial={{ scale: 1 }}
            className="font-['Poppins'] h-20 bg-black text-[20px] text-white w-[300px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-2xl transition-all"
            onClick={() => {
              navigate("/admin/courses");
            }}
          >
            Browse All Course
          </motion.button>
        </motion.h1>

        <motion.div
          animate={{ opacity: 1 }}
          initial={{ y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-['Poppins'] flex justify-center gap-4  w-full my-3"
        ></motion.div>
      </motion.div>
    </>
  );
};

export default AdminHome;
