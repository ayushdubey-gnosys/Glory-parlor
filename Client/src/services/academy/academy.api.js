import api from "../../api/api";

// CREATE COURSE
export const createCourse = async (data) => {
  const response = await api.post("/academy", data);
  return response.data;
};

// GET ALL COURSES
export const getCourses = async () => {
  const response = await api.get("/academy");
  return response.data;
};

// GET SINGLE COURSE
export const getCourseById = async (id) => {
  const response = await api.get(`/academy/${id}`);
  return response.data;
};

// UPDATE COURSE
export const updateCourse = async ({ id, data }) => {
  const response = await api.patch(
    `/academy/${id}`,
    data
  );

  return response.data;
};

// DELETE COURSE
export const deleteCourse = async (id) => {
  const response = await api.delete(`/academy/${id}`);
  return response.data;
};