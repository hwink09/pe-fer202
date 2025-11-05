import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllLessons } from "../apis/api";

function HomePage() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLessons();
        const isCompleted = data.filter((item) => item.isCompleted === false);
        setLessons(isCompleted);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container style={{ padding: "50px 0" }}>
      <Row>
        {lessons.map((item) => (
          <Col
            xs={12}
            md={4}
            lg={3}
            key={item.id}
            style={{ marginBottom: "30px" }}
          >
            <Card style={{ width: "100%", height: "100%" }}>
              <Card.Img
                variant="top"
                src={item.lessonImage}
                style={{
                  objectFit: "cover",
                  height: "200px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/SE123456/lesson/${item.id}`)}
              />

              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div>
                  <Card.Title
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.lessonTitle}
                  </Card.Title>

                  <Card.Text>
                    <strong>Level:</strong> {item.level} <br />
                    <strong>Estimated Time:</strong>{" "}
                    {item.estimatedTime.toLocaleString()} minutes
                  </Card.Text>
                </div>

                <div style={{ marginTop: "auto" }}>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/SE123456/lesson/${item.id}`)}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
