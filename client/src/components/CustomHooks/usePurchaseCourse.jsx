import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AdminLoading } from "../store/selectors/AdminLoading";

export const usePurchaseCourse = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const adminLoading = useRecoilValue(AdminLoading);

  const purchaseCourse = async (courseId) => {
    if (adminLoading) {
      navigate("/login");
    }

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
