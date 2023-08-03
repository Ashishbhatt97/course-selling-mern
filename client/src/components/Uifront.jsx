import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export const Uifront = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <img src="" alt="" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="font-['Poppins'] h-[80vh] w-full p-[150px] flex flex-col justify-center items-center overflow-hidden"
      >
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1.2 }}
          className="font-['Poppins'] text-[50px] font-bold text-center text-[#130606]"
        >
          <motion.span className="font-['Poppins'] font-bold text-[100px]  text-violet-600">
            Hello ,Learners
          </motion.span>
          <br />
          Boost Your Skills With Us
        </motion.h1>

        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0, y: 0 }}
          className="font-['Poppins'] flex justify-center gap-4 w-full my-3 pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            initial={{ scale: 1 }}
            className="font-['Poppins'] h-20 border-2 border-black w-[350px] hover:border-violet-600 rounded-2xl transition-all"
          >
            <Link to={"/courses"}>Browse All Courses</Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};
