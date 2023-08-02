/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { AdminLoading } from "../store/selectors/AdminLoading";
import { useRecoilValue } from "recoil";
import { isLoading } from "../store/selectors/isLoading";

const useGetCourse = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLoading = useRecoilValue(isLoading);


  const getCourse = async (token) => {
    if (!AdminLoading) {
       token = "Adtoken";
    } 
   
   if(!userLoading){
     token = "token";
   }

    try {
      const response = await axios.get("http://localhost:3000/users/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(token)}`,
        },
      });
      setLoading(false);
      setCourse(response.data.courses);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return { course, loading };
};

export default useGetCourse;
