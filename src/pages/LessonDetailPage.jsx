import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getLessonById } from "../apis/api";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(id);
        setLessons(data);
      } catch (err) {
        console.log(err)
        setError("Failed to load lesson details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !lessons) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error || "Lesson not found."}</Alert>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Go back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="align-items-start g-5">
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Img
              variant="top"
              src={lessons.lessonImage}
              alt={lessons.lessonTitle}
              style={{
                objectFit: "cover",
                height: "420px",
              }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm border rounded-4 bg-light">
            <h2 className="fw-bold mb-3 text-primary">{lessons.lessonTitle}</h2>
            <hr />

            <p className="mb-3">
              <strong>Level:</strong>{" "}
              <span className="text-dark">{lessons.level}</span>
            </p>

            <p className="mb-3">
              <strong>Is Compeleted:</strong>{" "}
              {lessons.isCompleted ? (
                <Badge bg="success" pill>
                  Yes
                </Badge>
              ) : (
                <Badge bg="danger" pill>
                  No
                </Badge>
              )}
            </p>

            <p className="mb-4">
              <strong>Estimated Time:</strong>{" "}
              <span className="fs-4 text-success fw-semibold">
                {lessons.estimatedTime.toLocaleString()} minutes
              </span>
            </p>

            <Button variant="primary" onClick={() => navigate("/")}>
              Back to Home Page
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailPage;
