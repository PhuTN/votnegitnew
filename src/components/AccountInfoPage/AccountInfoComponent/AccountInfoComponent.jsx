import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, DatePicker, Form, Typography, Row, Col, message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser, updatePassword } from '../../../redux/Slicer/userSlice';
import moment from 'moment';

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
  const [form] = Form.useForm(); // Sử dụng form instance của Ant Design
  const [passwordForm] = Form.useForm(); // Form cho phần đổi mật khẩu
  const dispatch = useDispatch();

  
  const [loading, setLoading] = useState(false); // Để kiểm soát trạng thái loading khi cập nhật
  const [loadingPassword, setLoadingPassword] = useState(false); // Để kiểm soát trạng thái loading khi đổi mật khẩu
  const { user, status, error } = useSelector((state) => state.user);
  // Gọi API lấy thông tin user khi load trang
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        if (decodedToken?.userId) {
          dispatch(fetchUserById(decodedToken.userId));
        } else {
          console.warn('Không tìm thấy userId trong token.');
        }
      } catch (error) {
        console.error('Lỗi khi giải mã token:', error);
      }
    } else {
      console.warn('Không tìm thấy token trong LocalStorage.');
    }
  }, [dispatch]);

  // Cập nhật giá trị trong form khi `user` thay đổi
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user?.email || '',
        username: user?.username || '',
        phoneNumber: user?.phoneNumber || '',
        gender: user?.gender || '',
        dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth) : null,
      });
    }
  }, [user, form]);

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async () => {
    setLoading(true); // Bắt đầu loading khi thực hiện cập nhật
    try {
      const values = await form.validateFields(); // Validate các trường trong form
      const userId = user?._id; // Lấy userId từ dữ liệu user đã có
  
      if (userId) {
        const updatedUserData = {
          ...values, // Các trường thông tin từ form
          id: userId, // Thêm userId vào dữ liệu
          role: "Customer", // Thêm role nếu không thay đổi
          isActive: true, // Giả sử trạng thái isActive luôn là true khi cập nhật
          createdAt: user?.createdAt || new Date().toISOString(), // Sử dụng thời gian tạo ban đầu hoặc tạo mới
          updatedAt: new Date().toISOString(), // Thời gian cập nhật
          _id: user?._id, // Giữ lại _id từ dữ liệu ban đầu nếu có
          // Đảm bảo password được xử lý đúng (nếu có thay đổi)
          password: user?.password , // Nếu không có thay đổi thì giữ nguyên
          address: values.address || user?.address || "", // Địa chỉ
        };
  
        // Gửi thông tin cập nhật tới API
        dispatch(updateUser({ userId, userData: updatedUserData })   ).unwrap()
        .then(() => {
          message.success("Cập nhật thông tin thành công");
        })
        .catch(() => {
          message.error("Cập nhật thông tin thất bại");
        });;
      }
    } catch (error) {
      console.error("Cập nhật thông tin thất bại:", error);
    } finally {
      setLoading(false); // Dừng loading khi đã xong
    }
  };

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = async () => {
    setLoadingPassword(true); // Bắt đầu loading khi đổi mật khẩu
    try {
      const values = await passwordForm.validateFields(); // Validate các trường trong form đổi mật khẩu
      if (values.newPassword !== values.confirmPassword) {
        message.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        return;
      }
      
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;


      console.log(values.oldPassword , values.newPassword)
      // Gửi yêu cầu đổi mật khẩu
      dispatch(updatePassword({ userId, currentPassword: values.oldPassword, newPassword: values.newPassword }))
        .unwrap()
        .then(() => {
          message.success("Đổi mật khẩu thành công!");
        })
        .catch(() => {
          message.error("Đổi mật khẩu thất bại!");
        });
    } catch (error) {
      console.error("Đổi mật khẩu thất bại:", error);
      message.error("Đổi mật khẩu thất bại!");
    } finally {
      setLoadingPassword(false); // Dừng loading khi đã xong
    }
  };
console.log(user)
  return (
    <Container>
      <Title level={3}>Thông tin tài khoản</Title>
      <Form 
        form={form} 
        layout="vertical"
        initialValues={{
          email: '',
          username: '',
          phoneNumber: '',
          gender: '',
          dateOfBirth: null,
        }}
      >
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Họ tên" name="username">
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày sinh" name="dateOfBirth">
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>
          </Col>
        </Row>

        <StyledButton 
          type="primary" 
          loading={loading || status === 'loading'} // Hiển thị loading nếu đang cập nhật
          onClick={handleUpdate}
        >
          CẬP NHẬT
        </StyledButton>
      </Form>

      <Title level={4} style={{ marginTop: '30px' }}>Đổi mật khẩu</Title>
      <Form form={passwordForm} layout="vertical">
        <Form.Item 
          label="Mật khẩu hiện tại" 
          name="oldPassword" 
          rules={[{ required: true, message: 'Mật khẩu hiện tại là bắt buộc!' }]}>
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item 
          label="Mật khẩu mới" 
          name="newPassword" 
          rules={[{ required: true, message: 'Mật khẩu mới là bắt buộc!' }]}>
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item 
          label="Nhập lại mật khẩu mới" 
          name="confirmPassword" 
          rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}>
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <StyledButton 
          type="primary" 
          loading={loadingPassword} 
          onClick={handleChangePassword}
        >
          ĐỔI MẬT KHẨU
        </StyledButton>
      </Form>
    </Container>
  );
};

export default AccountInfoComponent;
