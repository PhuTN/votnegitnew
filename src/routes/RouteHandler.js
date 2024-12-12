// RouteHandler.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteHandler = ({ route }) => {
    const getAuthToken = () => {
        return localStorage.getItem("token"); // Hoặc từ Redux store nếu bạn sử dụng Redux để lưu token
      };
  const token = getAuthToken(); // Lấy token từ Redux Store

  // Kiểm tra nếu route yêu cầu xác thực và người dùng chưa đăng nhập
  if (route.isProtected && !token) {
    return <Navigate to="/login" />;
  }

  const PageComponent = route.page;
  return <PageComponent />;
};

export default RouteHandler;
