import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllLessons = async () => {
  try {
    const { data } = await api.get("/");
    return data;
  } catch (err) {
    console.error("Error fetching all lessons:", err);
    throw err;
  }
};

export const getLessonById = async (id) => {
  try {
    const { data } = await api.get(`/${id}`);
    return data;
  } catch (err) {
    console.error(`Error fetching lesson with ID ${id}:`, err);
    throw err;
  }
};

export const createLesson = async (lessonData) => {
  try {
    const { data } = await api.post("/", lessonData);
    return data;
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
};

export const updateLesson = async (id, lessonData) => {
  try {
    const { data } = await api.put(`/${id}`, lessonData);
    return data;
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

export const deleteLesson = async (id) => {
  try {
    const { data } = await api.delete(`/${id}`);
    return data;
  } catch (err) {
    console.error(`Error deleting lesson with ID ${id}:`, err);
    throw err;
  }
};
