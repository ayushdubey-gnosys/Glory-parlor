import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookAppointmentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/appointments/all?action=book", { replace: true });
  }, [navigate]);

  return null;
};

export default BookAppointmentPage;