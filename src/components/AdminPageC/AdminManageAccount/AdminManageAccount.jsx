import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, Select, Input, Row, Col, Form, message } from 'antd';
import { EditOutlined, UndoOutlined } from '@ant-design/icons'; // Importing necessary icons
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateAllUsers } from '../../../redux/Slicer/userSlice'; // addUser action to handle new user addition

const AdminManageAccount = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const orderCategories = [
    { label: 'ID', value: 'id' },
    { label: 'Loại', value: 'type' },
    { label: 'Tên tài khoản', value: 'username' },
    { label: 'Số điện thoại', value: 'phoneNumber' },
    { label: 'Địa chỉ', value: 'address' },
    { label: 'Email', value: 'email' },
    { label: 'Giới Tính', value: 'gender' },
    { label: 'Ngày Sinh', value: 'birthDate' },
    { label: 'Hoạt động', value: 'status' },
  ];

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  const [selectedCategory, setSelectedCategory] = useState(orderCategories[0].value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Form instance for handling new user data

  const handleCategoryChange = (value) => { 
    setSelectedCategory(value); 
  };

  const handleSearch = (searchText) => { 
    const filtered = users.filter((item) => { 
      const columnKey = selectedCategory; 
      return item[columnKey] && item[columnKey].toString().toLowerCase().includes(searchText.toLowerCase()); 
    }); 
    setFilteredData(filtered); 
  };

  const handleStatusChange = (userId, status) => {
    const updatedStatus = status === 'Hoạt động' ? true : false;
    const updatedUsers = filteredData.map((user) => {
      if (user.id === userId) {
        return { ...user, isActive: updatedStatus };
      }
      return user;
    });
    setFilteredData(updatedUsers);
  };

  const columnsOrder = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'left' },
    { 
      title: 'Loại', 
      dataIndex: 'role', 
      key: 'role', 
      align: 'left',
      render: (role) => role === 'Admin' ? 'Quản trị viên' : 'Khách hàng',
    },
    { title: 'Tên tài khoản', dataIndex: 'username', key: 'username', align: 'left' },
    { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber', align: 'left' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address', align: 'left' },
    { title: 'Email', dataIndex: 'email', key: 'email', align: 'left' },
    {
      title: 'Giới Tính',
      dataIndex: 'gender',
      key: 'gender',
      align: 'left',
      render: (gender) => (gender === 'Male' ? 'Nam' : 'Nữ'),
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      align: 'left',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'left',
      render: (isActive, record) => (
        <Select
          defaultValue={isActive ? 'Hoạt động' : 'Không hoạt động'}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Select.Option value="active">Hoạt động</Select.Option>
          <Select.Option value="inactive">Không hoạt động</Select.Option>
        </Select>
      ),
    },
  ];

  const handleSave = async () => {
    try {
      await dispatch(updateAllUsers(filteredData)); 
      message.success("Changes saved!");
    } catch (error) {
      console.error("Failed to update users:", error);
    }
  };

  // Modal logic for adding a user
  const handleAddUser = async (values) => {
    // try {
    //   await dispatch(addUser(values)); // Assuming addUser handles adding the user in Redux
    //   setIsModalVisible(false);
    //   message.success('User added successfully!');
    //   form.resetFields();
    // } catch (error) {
    //   console.error("Failed to add user:", error);
    //   message.error('Failed to add user');
    // }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Row justify="end" style={{ marginBottom: '-100px', marginRight: '30px' }}>
        <Col>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '10px', 
            borderRadius: '8px', 
            display: 'flex', 
            gap: '8px',
          }}>
            <Select
              defaultValue={orderCategories[0].value}
              style={{ width: 150 }}
              options={orderCategories}
              onChange={handleCategoryChange}
            />
            <Input.Search
              placeholder="Tìm kiếm..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button type="primary" style={{ width: "100px" }} onClick={handleSave}>Save</Button>
            <Button 
              type="primary" 
              style={{ width: "100px", backgroundColor: "green" }} 
              onClick={() => setIsModalVisible(true)}
            >
              Add
            </Button>
          </div>
        </Col>
      </Row>

      <AdminTableComponent 
        title="Tài khoản" 
        columns={columnsOrder} 
        data={filteredData} 
      />

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item name="username" label="Tên tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính">
            <Select>
              <Select.Option value="Male">Nam</Select.Option>
              <Select.Option value="Female">Nữ</Select.Option>
              <Select.Option value="Other">Khác</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Ngày sinh">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="role" label="Vai trò">
            <Select defaultValue="Customer">
              <Select.Option value="Admin">Quản trị viên</Select.Option>
              <Select.Option value="Customer">Khách hàng</Select.Option>
              <Select.Option value="Seller">Người bán</Select.Option>
              <Select.Option value="WarehouseStaff">Nhân viên kho</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Thêm</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManageAccount;
