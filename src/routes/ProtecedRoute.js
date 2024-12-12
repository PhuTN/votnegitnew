// ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {


    const getAuthToken = () => {
        return localStorage.getItem("token"); // Hoặc từ Redux store nếu bạn sử dụng Redux để lưu token
      };
  const token = getAuthToken(); // Lấy token từ Redux Store

  return token ? children : <Navigate to="/login" />; // Chuyển hướng đến trang đăng nhập nếu chưa xác thực
};

export default ProtectedRoute;
