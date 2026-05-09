import api from "../../api/api";

// CREATE COURSE
export const createCourse = async (data) => {
  // if data is FormData (contains file), let axios set headers automatically
  if (data instanceof FormData) {
    const response = await api.post("/academy", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

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
  if (data instanceof FormData) {
    const response = await api.patch(`/academy/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  const response = await api.patch(`/academy/${id}`, data);
  return response.data;
};

// DELETE COURSE
export const deleteCourse = async (id) => {
  const response = await api.delete(`/academy/${id}`);
  return response.data;
};

export const enrollCourse = async (id) => {
  const response = await api.post(`/academy/${id}/enroll`);
  return response.data;
};