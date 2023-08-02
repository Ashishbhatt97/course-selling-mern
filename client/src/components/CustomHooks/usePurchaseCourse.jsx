import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePurchaseCourse = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const purchaseCourse = async (courseId) => {
    setLoading(true);
    const course_Id = parseInt(courseId);
    await axios.post(
      `http://localhost:3000/users/courses/${course_Id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setLoading(false);
    navigate("/purchased");
  };

  return { purchaseCourse, loading };
};
