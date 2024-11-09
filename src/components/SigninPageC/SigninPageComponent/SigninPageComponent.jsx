import React from 'react';
import styled from 'styled-components';
import { Input, Button, Typography } from 'antd';

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
  return (
    <RegisterWrapper>
      <Title>ĐĂNG KÝ</Title>
      <Divider />
      <RegisterText>
        Đã có tài khoản, đăng nhập <StyledLink href="#">tại đây</StyledLink>
      </RegisterText>
      <StyledInput placeholder="Nhập tên của bạn (*)" />
      <StyledInput placeholder="Nhập email của bạn (*)" />
      <StyledInput placeholder="Số điện thoại" />
      <StyledInput type="password" placeholder="Mật khẩu" />
      <StyledInput type="password" placeholder="Nhập lại mật khẩu" />
      <StyledButton type="primary">ĐĂNG KÝ</StyledButton>
    </RegisterWrapper>
  );
};

export default SigninPageComponent;
