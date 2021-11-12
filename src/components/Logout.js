import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "./../utils/axiosWithAuth";

const Logout = () => {

  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .post("http://localhost:5000/api/logout")
      .then(() => {
        localStorage.removeItem("token");
        push("/login");
      })
      .catch((error) => {
        console.error("FAILED TO LOGOUT!", error);
      });
  }, []);

  return <div></div>;
};

export default Logout;

