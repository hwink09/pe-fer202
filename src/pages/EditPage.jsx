import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getLessonById, updateLesson } from "../apis/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  lessonTitle: yup
    .string()
    .required("Lesson title is required.")
    .test(
      "min-words",
      "Lesson title must contain at least 2 words.",
      (value) => value && value.trim().split(" ").length >= 2
    ),
  lessonImage: yup
    .string()
    .required("Image URL is required.")
    .url("Must be a valid URL (http/https).")
    .matches(/^https?:\/\/.+/, "Must start with http:// or https://"),
  estimatedTime: yup
    .number()
    .typeError("Estimated time must be a number.")
    .required("Estimated time is required.")
    .positive("Estimated time must be greater than 0."),
  level: yup.string().required("Level is required."),
  isCompleted: yup.boolean(),
});

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      lessonTitle: "",
      lessonImage: "",
      estimatedTime: "",
      isCompleted: false,
      level: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLessonById(id);
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      } catch (err) {
        setSubmitError("Failed to load lesson data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateLesson(id, {
        ...data,
        estimatedTime: Number(data.estimatedTime),
      });
      navigate("/SE123456/all-lessons");
      toast.success("Lesson updated successfully!");
    } catch (err) {
      console.log(err)
      setSubmitError("Failed to update lesson. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Edit Lesson</h2>
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Lesson Title</Form.Label>
              <Form.Control
                type="text"
                {...register("lessonTitle")}
                isInvalid={!!errors.lessonTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lessonTitle?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lesson Image URL</Form.Label>
              <Form.Control
                type="text"
                {...register("lessonImage")}
                isInvalid={!!errors.lessonImage}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lessonImage?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estimated Time (minutes)</Form.Label>
              <Form.Control
                type="number"
                {...register("estimatedTime")}
                isInvalid={!!errors.estimatedTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.estimatedTime?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="switch"
                label="Is Completed?"
                {...register("isCompleted")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success">
          Update Lesson
        </Button>
      </Form>
    </Container>
  );
}

export default EditPage;
