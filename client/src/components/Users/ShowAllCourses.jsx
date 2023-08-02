/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { AdminLoading } from "../store/selectors/AdminLoading";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import useGetCourse from "../CustomHooks/useGetCourse";
import { usePurchaseCourse } from "../CustomHooks/usePurchaseCourse";

const ShowAllCourses = () => {
  
  const navigate = useNavigate();
  const { course, loading } = useGetCourse();
  const { purchaseCourse } = usePurchaseCourse();

  const purchaseCourseHandle = (courseId) => {
    purchaseCourse(courseId);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {course.length !== 0 ? (
        <>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-['Poppins'] text-[50px] uppercase font-bold text-center text-black/70 mt-5 gilroy-ExtraBold"
          >
            Available Courses
          </motion.h1>

          <div className="font-['Poppins'] flex items-center">
            <div className="font-['Poppins'] flex justify-around px-10 mt-2 items-center gap-5 flex-wrap w-[100vw]">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                {course.map((courses) => (
                  <MediaCard
                    key={courses.courseId}
                    title={courses.title}
                    description={courses.description}
                    price={courses.price}
                    image={courses.image}
                    onClick={() => {
                      purchaseCourseHandle(courses.courseId);
                    }}
                    onAdminClick={() =>
                      navigate(`/admin/courses/${courses.courseId}`)
                    }
                    BtnSeeMore={"See More"}
                    Btntitle={"Buy Now"}
                  ></MediaCard>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="font-['Poppins'] text-[50px] uppercase font-extrabold text-center text-black">
            No Course Available
          </h1>
        </>
      )}
    </>
  );
};

function MediaCard(props) {
  const adminLoading = useRecoilValue(AdminLoading);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="font-['Poppins'] flex flex-col max-w-[300px] p-5 rounded-lg shadow-lg"
    >
      <CardMedia
        style={{
          borderRadius: "15px",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        sx={{ height: 140 }}
        image={props.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <h5 className="font-['Poppins']  mx-3 font-bold gilroy-regular text-gray-800 my-3">
        Price : ₹ {props.price}
      </h5>

      <div className="flex gap-6">
        {adminLoading ? (
          <motion.button
            className="font-['Poppins']  bg-black text-white w-[120px] h-[45px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-2xl transition-all"
            onClick={props.onClick}
          >
            {props.Btntitle}
          </motion.button>
        ) : null}

        {!adminLoading && (
          <motion.button
            className="font-['Poppins']  bg-black text-white w-[120px] h-[45px] hover:bg-white hover:border-2 hover:border-black hover:text-stone-950 rounded-2xl transition-all"
            onClick={props.onAdminClick}
          >
            {props.BtnSeeMore}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default ShowAllCourses;
