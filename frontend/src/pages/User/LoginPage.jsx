import React, { useEffect } from "react";
import Login from "../../components/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <Login />
    </div>
  );
};

export default LoginPage;
