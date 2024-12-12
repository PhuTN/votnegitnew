import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Slicer/authSlice"; // Đường dẫn phù hợp đến authSlice
import { jwtDecode } from "jwt-decode";
import { fetchCartByUserId } from "../../redux/Slicer/cartSlice";
import axios from "axios";

const LoginWrapper = styled.div`
  max-width: 300px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #1da0f1;
  font-size: 24px;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 50%;
  height: 4px;
  background-color: #1da0f1;
  margin: 8px auto 20px;
  border-radius: 2px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px;
`;

const StyledButton = styled(Button)`
  background-color: #1da0f1;
  border-color: #1da0f1;
  color: white;
  font-weight: bold;
  width: 100%;
  height: 40px;
  &:hover {
    background-color: white;
    border-color: #1da0f1;
  }
`;

const Link = styled.a`
  color: #1da0f1;
  display: block;
  margin-top: 10px;
  font-size: 14px;
`;

const LoginPageComponent = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth); // Trạng thái từ Redux

  const handleClick = () => {
    if (!account) {
      message.warning("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!password) {
      message.warning("Vui lòng nhập mật khẩu");
      return;
    }
   // localStorage.clear();
    dispatch(loginUser({ username: account, password }))
      .unwrap()
      .then((response) => {
        if(response === "error"){
        console.log(response)
        message.error("Email hoặc password bị sai !");
        }
        else{
          
          localStorage.setItem("token", response.token); // Lưu token
         
          try {
            const decodedToken = jwtDecode(response.token);
            
            console.log(decodedToken)
            // dispatch(fetchCartByUserId(decodedToken?.userId)).then((action) => {
            //   if (action.payload) {
            //     localStorage.setItem("cart", JSON.stringify(action.payload));
                
            //   }
            // });




            axios
      .get(`http://localhost:8081/api/cart/${decodedToken?.userId}`, {
        headers: {
          Authorization: `Bearer ${response.token}`, // Gửi token trong header
        },
      })
      .then((response) => {
       
        localStorage.setItem("cart", JSON.stringify(response.data)); // Lưu vào localStorage
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
       
      });
          } catch (error) {
            console.error("Invalid token", error);
          }
          

          if( localStorage.getItem("previousURL")){
            navigate(localStorage.getItem("previousURL"));
          }
           else {
            navigate("/");
           }

setTimeout(() => {
    window.location.reload();
}, 300); // 1000ms = 1 giây

        }
      //   // Chuyển hướng sau đăng nhập
      })
      .catch(() => {
        // Chỉ hiển thị thông báo lỗi
        message.error("Đăng nhập thất bại");
      });
  };
  

 



  

 






  
  return (
    <LoginWrapper>
      <Title>ĐĂNG NHẬP</Title>
      <Divider />
      <StyledInput
        placeholder="Email"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <StyledInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
      />
      <StyledButton onClick={handleClick} type="primary" loading={status === "loading"}>
        ĐĂNG NHẬP
      </StyledButton>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <Link href="/">Quên mật khẩu</Link>
      <Link href="/signin">Đăng ký tại đây</Link>
    </LoginWrapper>
  );
};

export default LoginPageComponent;
