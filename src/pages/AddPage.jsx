import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createLesson } from "../apis/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  lessonTitle: yup
    .string()
    .required("Lesson title is required.")
    .test(
      "min-words",
      "Lesson title must contain more than 1 word.",
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

function AddPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    try {
      await createLesson({
        ...data,
        estimatedTime: Number(data.estimatedTime),
        isCompleted: !!data.isCompleted,
      });
      navigate("/SE123456/all-lessons");
      toast.success("Lesson created successfully!");
    } catch (err) {
      console.error(err)
      setSubmitError("Failed to create lesson. Please try again.");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Add New Lesson</h2>
      {submitError && <Alert variant="danger">{submitError}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
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

            <Form.Group className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Select {...register("level")} isInvalid={!!errors.level}>
                <option value="">-- Select Level --</option>
                <option value="n1">N1</option>
                <option value="n2">N2</option>
                <option value="n3">N3</option>
                <option value="n4">N4</option>
                <option value="n5">N5</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.level?.message}
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
          Create Lesson
        </Button>
      </Form>
    </Container>
  );
}

export default AddPage;
