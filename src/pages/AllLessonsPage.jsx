import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteLesson, getAllLessons } from "../apis/api";

function AllLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        const sorted = data.sort((a, b) => Number(b.id) - Number(a.id));
        setLessons(sorted);
      } catch (err) {
        console.error("Error loading all lessons:", err);
      }
    };
    fetchLessons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this lesson?")) {
      try {
        await deleteLesson(id);
        setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
        toast.success("Lesson deleted successfully!");
      } catch (err) {
        console.log(err)
        toast.error("Failed to delete the lesson.");
      }
    }
  };

  return (
    <Container className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">All Lessions</h2>
        <Button variant="success" onClick={() => navigate("/SE123456/add")}>
          <FaPlus className="me-2" />
          Add New Lesson
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Lesson Title</th>
            <th>Level</th>
            <th>Estimated Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, index) => (
            <tr
              key={lesson.id}
              onClick={() => navigate(`/SE123456/lesson/${lesson.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{index + 1}</td>
              <td>{lesson.lessonTitle}</td>
              <td>{lesson.level}</td>
              <td>{lesson.estimatedTime.toLocaleString()} minutes</td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/SE123456/edit/${lesson.id}`)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(lesson.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AllLessonsPage;
