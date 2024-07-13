import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
const FirstStep = () => {
   
  const navigate = useNavigate();
  const  user  = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/second");
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            autoComplete="off"
            {...register("first_name", {
              required: "First name is required.",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "First name should contain only characters."
              }
            })}
            className={`${errors.first_name ? "input-error" : ""}`}
          />
          {errors.first_name && (
            <p className="errorMsg">{errors.first_name.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            autoComplete="off"
            {...register("last_name", {
              required: "Last name is required.",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Last name should contain only characters."
              }
            })}
            className={`${errors.last_name ? "input-error" : ""}`}
          />
          {errors.last_name && (
            <p className="errorMsg">{errors.last_name.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};

export default FirstStep;
