import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const LoginWrapper = styled.div`
  max-width: 300px;
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
  margin: 8px auto 20px;
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
    background-color: white;
    border-color: #1DA0F1;
  }
`;

const Link = styled.a`
  color: #1DA0F1;
  display: block;
  margin-top: 10px;
  font-size: 14px;
`;

const LoginPageComponent = () => {
  return (
    <LoginWrapper >
      <Title>ĐĂNG NHẬP</Title>
      <Divider />
      <StyledInput placeholder="Email" />
      <StyledInput type="password" placeholder="Mật khẩu" />
      <StyledButton type="primary">ĐĂNG NHẬP</StyledButton>
      <Link href="#">Quên mật khẩu | Đăng ký tại đây</Link>
    </LoginWrapper>
  );
};

export default LoginPageComponent;
