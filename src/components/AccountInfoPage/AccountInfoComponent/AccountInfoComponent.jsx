import React from 'react';
import styled from 'styled-components';
import { Button, Input, Select, DatePicker, Form, Typography, Row, Col } from 'antd';

const { Title } = Typography;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background-color: #1DA0F1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  color: #fff;
  &:hover {
    background-color: #d3541b;
    border-color: #1DA0F1;
  }
`;

const AccountInfoComponent = () => {
  return (
    <Container>
      <Title level={3}>Thông tin tài khoản</Title>
      <Form layout="vertical">
        <Form.Item label="Email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Giới tính">
              <Select placeholder="Chọn giới tính">
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày sinh">
              <DatePicker style={{ width: '100%' }} format="MM-DD-YYYY" placeholder="Chọn ngày sinh" />
            </Form.Item>
          </Col>
        </Row>

        <StyledButton type="primary">CẬP NHẬT</StyledButton>
      </Form>

      <Title level={4} style={{ marginTop: '30px' }}>Đổi mật khẩu</Title>
      <Form layout="vertical">
        <Form.Item label="Mật khẩu hiện tại">
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item label="Mật khẩu mới">
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item label="Nhập lại mật khẩu mới">
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <StyledButton type="primary">ĐỔI MẬT KHẨU</StyledButton>
      </Form>
    </Container>
  );
};

export default AccountInfoComponent;
