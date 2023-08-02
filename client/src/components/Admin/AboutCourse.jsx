/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { AdminLoading } from "../store/selectors/AdminLoading";
import { useRecoilValue } from "recoil";

const AboutCourse = () => {
  const param = useParams();
  const courseId = parseInt(param.courseId);
  const [course, setCourse] = useState({});
  const [prevcourse, setPrevcourse] = useState({});
  const adminLoading = useRecoilValue(AdminLoading);
  const navigate = useNavigate();
  const updateCourse = async () => {
    await axios.put(
      `http://localhost:3000/admin/courses/${courseId}`,
      {
        title: prevcourse.title,
        description: prevcourse.description,
        price: prevcourse.price,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      }
    );
  };

  const getCourse = async () => {
    const response = await axios.get(
      `http://localhost:3000/admin/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      }
    );
    setCourse(response.data);
    setPrevcourse(response.data);
  };

  useEffect(() => {
    if (adminLoading) {
      navigate("/admin/login");
    }

    getCourse();
  }, []);
  return (
    <>
      <div className="font-['Poppins'] flex w-[100vw] py-16  justify-start px-[150px] relative">
        <div
          className="font-['Poppins'] w-[60px] h-[60px] mx-[250px] border-2 border-gray-100 rounded-full flex justify-center shadow-lg items-center absolute right-28 top-2 cursor-pointer"
          onClick={() => history.back()}
        >
          <ArrowBackIcon fontSize="large" color={"primary"} />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="font-['Poppins'] text-bold w-[60%] flex flex-col gap-6"
        >
          <div className="font-['Poppins']  text-[40px]">
            <h1 className="font-['Poppins'] font-bold text-blue-500">
              {course.title}
            </h1>
          </div>
          <div>
            <h1 className="font-['Poppins'] gilroy-bold">Description : </h1>
            <h1 className="font-['Poppins'] text-[20px] text-gray-600 font-bold ">
              {course.description}
            </h1>
          </div>
          <img
            src={course.image}
            alt="sad"
            height={100}
            width={500}
            style={{ borderRadius: "25px", marginTop: "20px" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="font-['Poppins'] flex flex-col top-[150px] h-[400px] absolute right-[150px] w-[300px] border-gray-300 border-2 p-5 rounded-lg shadow-lg"
        >
          <h1 className="font-['Poppins'] text-center mb-5 font-bold">
            Update Course
          </h1>
          <div className="font-['Poppins'] mt-5 flex flex-col justify-center">
            <div className="font-['Poppins'] flex flex-col items-center">
              <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input
                  id="myTitle"
                  aria-describedby="my-helper-text"
                  name="title"
                  onChange={(e) =>
                    setPrevcourse({ ...prevcourse, title: e.target.value })
                  }
                />
                <br />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Descriptions</InputLabel>
                <Input
                  id="my-descriptions"
                  aria-describedby="my-helper-text"
                  name="description"
                  onChange={(e) =>
                    setPrevcourse({
                      ...prevcourse,
                      description: e.target.value,
                    })
                  }
                />
                <br />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="my-input">Price</InputLabel>
                <Input
                  type="number"
                  id="my-price"
                  aria-describedby="my-helper-text"
                  name="description"
                  onChange={(e) =>
                    setPrevcourse({ ...prevcourse, price: e.target.value })
                  }
                />
              </FormControl>
              <div className="font-['Poppins'] mt-10">
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    updateCourse(e.id),
                      setCourse({
                        ...prevcourse,
                      });
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutCourse;
