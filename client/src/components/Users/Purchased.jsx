/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Loading from "../Loading";
import { PurchasedCourseCard } from "../Cards/PurchasedCourseCard";

const Purchased = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourse = async () => {
    const response = await axios.get(
      "http://localhost:3000/users/purchasedCourses",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setLoading(false)
    setCourse(response.data.purchasedCourses);
  };

  useEffect(() => {
  getCourse();
  },[]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            {course.length !== 0 && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="font-['Poppins'] text-[50px] uppercase font-extrabold text-center text-black gilroy-ExtraBold"
              >
                Courses Purchased
              </motion.h1>
            )}
          </div>
          <div className="font-['Poppins'] flex justify-around px-10 items-center flex-wrap md:flex ">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "20px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              {course.length !== 0 ? (
                course.map((courses) => (
                  <PurchasedCourseCard
                    key={courses.courseId}
                    title={courses.title}
                    description={courses.description}
                    price={courses.price}
                    image={courses.image}
                    Btntitle={"View Content"}
                  ></PurchasedCourseCard>
                ))
              ) : (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="font-['Poppins'] text-[50px] uppercase font-bold text-center text-black gilroy-ExtraBold"
                >
                  No Course Purchased
                </motion.h1>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};


export default Purchased;
