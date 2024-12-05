import React from 'react';
import styled from 'styled-components';
import { Input, Button, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Link } = Typography;

const RegisterWrapper = styled.div`
  max-width: 320px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #1DA0F1;
  font-size: 24px;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 50%;
  height: 4px;
  background-color: #1DA0F1;
  margin: 8px auto 10px;
  border-radius: 2px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px;
`;

const StyledButton = styled(Button)`
  background-color: #1DA0F1;
  border-color: #1DA0F1;
  color: white;
  font-weight: bold;
  width: 100%;
  height: 40px;
  &:hover {
    background-color: #1DA0F1;
    border-color:#1DA0F1;
  }
`;

const RegisterText = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #f4511e;
`;

const SigninPageComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [userName, setUsername] = useState('')
  const [password, setPassWord] = useState("")
  const [password2, setPassWord2] = useState("")
  const handleSignUp = () => {
    if (!name){
      alert("Vui lòng nhập tên người dùng")
      return
    }
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      alert("Email không hợp lệ")
      return
  }
  if (!phone.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
      alert("Số điện thoại không hợp lệ")
      return
  }
  if (!userName){
    alert("Vui lòng nhập tên đăng nhập")
    return
  }
  if (password !== password2 )
      {
          alert("Mật khẩu không trùng khớp")
          return 
      }
  // if (password.length < 5)
  //     {
  //         alert("Yêu cầu mật khẩu ít nhất 5 ký tự")
  //         return
  //     }

    fetch("http://localhost:8081/v1/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        username: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.success === false) {
          localStorage.clear();
          alert("Mời đăng ký lại, dữ liệu đã nhập trùng");
        } else {
          alert("Tạo tài khoản thành công, mời đăng nhập");
          navigate("/login");
        }
      })
      .catch((err) => console(err));
  };

  return (
    <RegisterWrapper>
      <Title>ĐĂNG KÝ</Title>
      <Divider />
      <RegisterText>
        Đã có tài khoản, đăng nhập <StyledLink href="#">tại đây</StyledLink>
      </RegisterText>
      <StyledInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên của bạn (*)" />
      <StyledInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email của bạn (*)" />
      <StyledInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
      <StyledInput value={userName} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên đăng nhập (*)" />
      <StyledInput value={password} onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="Mật khẩu" />
      <StyledInput value={password2} onChange={(e) => setPassWord2(e.target.value)} type="password" placeholder="Nhập lại mật khẩu" />
      <StyledButton type="primary" onClick={handleSignUp} > ĐĂNG KÝ</StyledButton>
    </RegisterWrapper>
  );
};

export default SigninPageComponent;
