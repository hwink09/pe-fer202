import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { getAllLessons } from "../apis/api";

function CompletedLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        const filtered = data
          .filter((item) => item.isCompleted === true)
          .sort((a, b) => Number(b.id) - Number(a.id));
        setLessons(filtered);
      } catch (err) {
        console.error("Error loading completed lessons:", err);
      }
    };

    fetchLessons();
  }, []);

  return (
    <Container className="p-4">
      <h2 className="mb-4">Completed Lessons</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Lesson Name</th>
            <th>Level</th>
            <th>Estimated Time</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CompletedLessonsPage;
