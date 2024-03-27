import React, { useState } from "react";
import Loader from "./Loader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Container, Row, Col,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { createEmployee } from "../action/employeeSlice";

const Create = () => {
    const containerStyle = {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        alignItems: "center",
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [file, setfile] = useState('');

    const schema = yup.object().shape({
        firstName: yup
          .string()
          .required("First Name is Required")
          .trim()
          .min(3, "First Name Must be at Least 3 Characters Long")
          .max(50, "First Name  Must be at Most 50 Characters Long"),
        lastName: yup
          .string()
          .required("Last Name is Required")
          .trim()
          .min(3, "Last Name Must be at Least 3 Characters Long")
          .max(50, "Last Name  Must be at Most 50 Characters Long"),
        phone: yup
          .string()
          .required("Phone is Required")
          .matches(/^\d+$/, "Phone must only contain numbers"),
        email: yup
          .string()
          .required("Email is Required")
          .email("Invalid Email Format"),
        address: yup
          .string()
          .required("Address is Required")
          .trim()
          .min(3, "Address Must be at Least 3 Characters Long")
          .max(50, "Address  Must be at Most 50 Characters Long"),
        department: yup
          .string()
          .required("Department is Required")
          .trim()
          .min(3, "Address Must be at Least 3 Characters Long")
          .max(30, "Address  Must be at Most 50 Characters Long"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        console.log(file, 'file')
        setfile(file);
    }
    const handleFormSubmit = async (data, e) => {
        setLoader(true)
        try {
            data = { ...data, image: file}
            console.log('I AM DATa', data);
            // Dispatch the action and wait for it to complete
            await dispatch(createEmployee(data));

            // Reset the form only if the dispatch is successful
            e.target.reset();
            navigate("/")
            setLoader(false);
        } catch (error) {
            setLoader(false);
            if (error)
                console.error("Error submitting form:", error);
            // Handle the error (e.g., display an error message)
        }
    };
    if (loader){
        return (
          <div className={'vh-100 d-flex justify-content-center align-items-center'}>
              <Loader/>
          </div>);
    }
    return (
      <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={10} lg={8} xs={12}>
                  <div className="border border-3 border-primary"></div>
                  <Card className="shadow">
                      <Card.Body>
                          <div className="mb-3 mt-4">
                              <h2 className="fw-bold mb-2 text-uppercase">Create Employee</h2>
                              <p className=" mb-5">please enter detail to create employee</p>
                              <form onSubmit={handleSubmit(handleFormSubmit)} >
                                  <Row className="justify-content-md-center">
                                      <Col md="12">
                                          <Row className="mb-3">
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>Profile</Form.Label>
                                                      <Form.Control
                                                        {...register("avatar")}
                                                        type="file"
                                                        accept={'image/*'}
                                                        onChange={handleImageChange}
                                                        isInvalid={!!errors.avatar}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.avatar?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                          </Row>
                                          <Row className="mb-3">
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>First Name</Form.Label>
                                                      <Form.Control
                                                        {...register("firstName")}
                                                        type="text"
                                                        placeholder="Enter First Name"
                                                        isInvalid={!!errors.firstName}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.firstName?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>Last Name</Form.Label>
                                                      <Form.Control
                                                        {...register("lastName")}
                                                        type="text"
                                                        placeholder="Enter Last Name"
                                                        isInvalid={!!errors.lastName}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.lastName?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                          </Row>
                                          <Row className="mb-3">
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>Phone</Form.Label>
                                                      <Form.Control
                                                        {...register("phone")}
                                                        type="tel" // Change this line to type="tel"
                                                        placeholder="Enter Phone Number"
                                                        isInvalid={!!errors.phone}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.phone?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>Email</Form.Label>
                                                      <Form.Control
                                                        {...register("email")}
                                                        type="email" // Change this line
                                                        placeholder="Enter Email"
                                                        isInvalid={!!errors.email}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.email?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                          </Row>
                                          <Row className="mb-3">
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>Address</Form.Label>
                                                      <Form.Control
                                                        {...register("address")}
                                                        type="text"
                                                        placeholder="Enter Address"
                                                        isInvalid={!!errors.address}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.address?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                              <Col md="6">
                                                  <Form.Group>
                                                      <Form.Label>Department</Form.Label>
                                                      <Form.Control
                                                        {...register("department")}
                                                        type="text"
                                                        placeholder="Enter Department"
                                                        isInvalid={!!errors.department}
                                                      />
                                                      <Form.Control.Feedback type="invalid">
                                                          {errors.department?.message}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                              </Col>
                                          </Row>
                                          <div className="d-grid">
                                              <Button variant="primary" type="submit">
                                                  Create
                                              </Button>
                                          </div>
                                      </Col>
                                  </Row>
                              </form>
                          </div>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
      </Container>
    );
};

export default Create;
