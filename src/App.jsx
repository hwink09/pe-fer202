import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/HomePage";
import AllLessonsPage from "./pages/AllLessonsPage";
import CompletedLessonsPage from "./pages/CompletedLessonsPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import LessonDetailPage from "./pages/LessonDetailPage";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SE123456/all-lessons" element={<AllLessonsPage />} />
        <Route path="/SE123456/completed-lessons" element={<CompletedLessonsPage />}/>
        <Route path="/SE123456/lesson/:id" element={<LessonDetailPage />} />
        <Route path="/SE123456/add" element={<AddPage />} />
        <Route path="/SE123456/edit/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
