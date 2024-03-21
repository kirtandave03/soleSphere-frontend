import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let auth = localStorage.getItem("auth-token");

      if (!auth) {
        navigate("/login");
      }

      const url = "http://localhost:3000/api/v1/auth/verify-token";

      try {
        var response = await axios.get(url, {
          headers: {
            "auth-token": auth,
          },
        });
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
          return;
        } else {
          // navigate("/error");
          console.log("Error : ", error);
        }
      }
    })();
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
