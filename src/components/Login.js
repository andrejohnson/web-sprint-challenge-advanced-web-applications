import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const initialValues = {
  username: "",
  password: "",
};
const initialErrors = {
  submit: "",
};

const Login = () => {

  const { push } = useHistory();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const login = () => {
    axios
      .post("http://localhost:5000/api/login", values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setErrors({ submit: "" });
        push("/view");
      })
      .catch((error) => {
        console.error("FAILED TO LOG IN!", error);
        setErrors({ ...errors, submit: "Incorrect Login/Password" });
      });
  };


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <ComponentContainer>
      <ModalContainer>
        <h1>Welcome to Blogger Pro</h1>
        <h2>Please enter your account information.</h2>

        <p id="error">{errors.submit}</p>

        <FormGroup onSubmit={handleSubmit}>
          <Label>
            Username
            <Input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Password
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
          </Label>
          <Button id="submit">Log In</Button>
        </FormGroup>
      </ModalContainer>
    </ComponentContainer>
  );
};

export default Login;

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
