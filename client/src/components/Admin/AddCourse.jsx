/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import Loading from "../Loading";

const AddCourse = () => {
  const navigate = useNavigate();
  const [addCourse, setAddCourse] = useState(false);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevcourse, setPrevcourse] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const getCourse = async () => {
    const response = await axios.get("http://localhost:3000/admin/courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
      },
    });
    setLoading(false);
    setCourse(response.data);
  };
  useEffect(() => {
    
    getCourse();
  }, []);

  const addCourseHandle = async () => {
    await axios.post(
      "http://localhost:3000/admin/courses",
      {
        title: prevcourse.title,
        description: prevcourse.description,
        image: prevcourse.image,
        price: parseInt(prevcourse.price),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      }
    );
    setPrevcourse({
      title: "",
      description: "",
      image: "",
      price: null,
    });
    getCourse();
  };
  const deleteCourse = async (courseId) => {
    const response = await axios.delete(
      `http://localhost:3000/admin/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Adtoken")}`,
        },
      }
    );
    setCourse(response.data.course);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div>
        <div>
          {addCourse && (
            <div className="font-['Poppins'] flex flex-col justify-center items-center mt-10">
              <div
                className="font-['Poppins'] w-[50px] h-[50px] rounded-full border-2 font-bold border-black/25  absolute right-[150px] top-[100px] flex justify-center items-center text-2xl  gilroy-ExtraBold shadow-lg cursor-pointer"
                onClick={() => {
                  setAddCourse(false);
                }}
              >
                X
              </div>
              <motion.h1 className="font-['Poppins'] text-[50px] font-bold uppercase  text-black ">
                Add Course
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: easeInOut, delay: 0.01 }}
                className="font-['Poppins'] w-[450px] p-6  border-2 border-black/10 shadow-xl rounded-lg  h-full flex flex-col transition-all ease-in-out"
              >
                <FormControl>
                  <InputLabel htmlFor="my-input">Title</InputLabel>
                  <Input
                    required
                    id="myTitle"
                    aria-describedby="my-helper-text"
                    name="title"
                    value={prevcourse.title}
                    onChange={(e) =>
                      setPrevcourse({ ...prevcourse, title: e.target.value })
                    }
                  />
                  <br />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="my-input">Descriptions</InputLabel>
                  <Input
                    required
                    id="my-descriptions"
                    aria-describedby="my-helper-text"
                    name="description"
                    value={prevcourse.description}
                    onChange={(e) =>
                      setPrevcourse({
                        ...prevcourse,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="my-input">Images</InputLabel>
                  <Input
                    id="my-Images"
                    aria-describedby="my-helper-text"
                    name="Images"
                    value={prevcourse.image}
                    onChange={(e) =>
                      setPrevcourse({ ...prevcourse, image: e.target.value })
                    }
                  />
                </FormControl>
                <br />
                <FormControl>
                  <InputLabel htmlFor="my-input">Price</InputLabel>
                  <Input
                    required
                    type="number"
                    id="my-Price"
                    aria-describedby="my-helper-text"
                    name="Price"
                    value={prevcourse.price}
                    autoComplete="none"
                    aria-disabled
                    onChange={(e) =>
                      setPrevcourse({ ...prevcourse, price: e.target.value })
                    }
                  />
                </FormControl>
                <div className="font-['Poppins'] flex justify-center items-center">
                  <motion.button
                    className="font-['Poppins']   bg-white border-2 flex items-center justify-center w-[200px] h-[45px] mt-[35px] border-black  rounded-lg transition-all"
                    onClick={() => addCourseHandle()}
                  >
                    Add Course
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
        <div className="font-['Poppins'] flex justify-center items-center flex-col mt-6">
          {!addCourse && (
            <motion.button
              className="font-['Poppins']  bg-black text-white w-[300px] h-[45px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-lg transition-all"
              onClick={() => setAddCourse(true)}
            >
              Add New Course
            </motion.button>
          )}
          {course.length !== 0 ? (
            <h1 className="font-['Poppins'] text-[50px] uppercase font-bold text-stone-900 mt-8">
              Available Courses
            </h1>
          ) : (
            <h1 className="font-['Poppins'] text-[50px] uppercase font-bold text-stone-900 mt-8">
              No Course Published
            </h1>
          )}
        </div>
        <div className="font-['Poppins'] flex justify-between items-center p-10 flex-wrap w-full">
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {course.map((courses) => (
              <MediaCard
                key={courses.courseId}
                title={courses.title}
                description={courses.description}
                price={courses.price}
                image={courses.image}
                btnContent={"See More"}
                btnClick={() => {
                  navigate(`/admin/courses/${courses.courseId}`);
                }}
                DelbtnContent={"Delete Course"}
                btnDel={() => {
                  deleteCourse(courses.courseId);
                }}
              ></MediaCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

function MediaCard(props) {
  return (
    <Card
      style={{ display: "flex", flexDirection: "column" }}
      sx={{ maxWidth: 345, padding: "20px", borderRadius: "20px" }}
    >
      <CardMedia
        style={{ borderRadius: "15px" }}
        sx={{ height: 140 }}
        image={props.image}
        title="green iguana"
      />
      <CardContent>
        <h1 className="font-['Poppins'] text-[14px] font-bold">
          {props.title}
        </h1>
        <h6>{props.description}</h6>
      </CardContent>
      <h5 className="font-['Poppins'] font-bold mx-4 text-gray-800">
        Price : ₹{props.price}
      </h5>
      <div className="font-['Poppins'] flex justify-center items-center gap-6 mt-4">
        <motion.button
          className="font-['Poppins']  bg-white border-2 border-black text-black w-[120px] h-[45px]  rounded-lg transition-all"
          variant="contained"
          onClick={props.btnClick}
        >
          {props.btnContent}
        </motion.button>
        <motion.button
          className="font-['Poppins'] bg-black text-white w-[130px] h-[45px]  rounded-lg transition-all"
          variant="contained"
          onClick={props.btnDel}
        >
          {props.DelbtnContent}
        </motion.button>
      </div>
    </Card>
  );
}

export default AddCourse;
