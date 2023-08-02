/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { isLoading } from "../store/selectors/isLoading";
import Loading from "../Loading";
import { MediaCard } from "../Cards/MediaCard";
import { usePurchaseCourse } from "../CustomHooks/usePurchaseCourse";
import useGetCourse from "../CustomHooks/useGetCourse";

const ShowCourses = () => {
  const userLoading = useRecoilValue(isLoading);
  const { purchaseCourse } = usePurchaseCourse();
  const { course, loading } = useGetCourse();


  const purchaseCourseHandle = (courseId) => {
    purchaseCourse(courseId);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!userLoading && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-['Poppins'] text-[50px] uppercase font-extrabold text-center text-black gilroy-ExtraBold"
            >
              Available Courses
            </motion.h1>
          )}

          <div className="font-['Poppins'] flex items-center">
            <div className="font-['Poppins'] flex justify-around p-10 items-center gap-5 flex-wrap w-[100vw]">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                {!userLoading ? (
                  course.map((courses) => (
                    <MediaCard
                      key={courses.courseId}
                      title={courses.title}
                      description={courses.description}
                      price={courses.price}
                      image={courses.image}
                      onClick={() => {
                        purchaseCourseHandle(courses.courseId);
                      }}
                      Btntitle={"Buy Now"}
                    ></MediaCard>
                  ))
                ) : (
                  <h1 className="font-['Poppins'] text-[50px] uppercase font-bold text-center text-black gilroy-ExtraBold">
                    No Course Available
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCourses;
