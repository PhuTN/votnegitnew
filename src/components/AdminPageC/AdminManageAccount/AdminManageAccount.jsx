import React, { useState } from 'react'; 
import { Modal, Table, Button, Select, Input, Row, Col, Tooltip, Form, message } from 'antd'; 
import { EditOutlined, UndoOutlined } from '@ant-design/icons'; // Importing necessary icons

import AdminTableComponent from '../AdminTableComponent/AdminTableComponent'; 

const AdminManageAccount = () => { 
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
    
    const dataOrders = [
        {
            id: 1,
            type: 'Khách hàng', // Loại khách hàng
            username: 'nguyenvana',
            phoneNumber: '0901234567',
            address: '123 Đường A, Quận B',
            email: 'nguyenvana@example.com',
            gender: 'male',
            birthDate: '1990-01-01',
            status: 'active', // Hoạt động
        },
        {
            id: 2,
            type: 'Nhân viên bán hàng', // Nhân viên bán hàng
            username: 'tranthib',
            phoneNumber: '0912345678',
            address: '456 Đường C, Quận D',
            email: 'tranthib@example.com',
            gender: 'female',
            birthDate: '1985-05-10',
            status: 'inactive', // Không hoạt động
        },
        {
            id: 3,
            type: 'Nhân viên kho', // Nhân viên kho
            username: 'leminhc',
            phoneNumber: '0923456789',
            address: '789 Đường E, Quận F',
            email: 'leminhc@example.com',
            gender: 'male',
            birthDate: '1992-07-20',
            status: 'active', // Hoạt động
        },
        // Thêm các đối tượng khác nếu cần thiết
    ];
    



  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [filteredData, setFilteredData] = useState(dataOrders); 
  const [selectedCategory, setSelectedCategory] = useState(orderCategories[0].value); 
  const [isUpdateShippingModalVisible, setIsUpdateShippingModalVisible] = useState(false);
  const [isReturnReasonModalVisible, setIsReturnReasonModalVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  // Separate form instances for each modal to avoid conflicts
  const [shippingForm] = Form.useForm();
  const [returnReasonForm] = Form.useForm();

  // Handler to open Update Shipping Progress Modal
  const handleUpdateShipping = (orderId) => {
    setCurrentOrderId(orderId);
    const order = filteredData.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    // Set initial value for the form based on current shipping status
    shippingForm.setFieldsValue({ shippingStatus: order.shippingStatus || '' });
    setIsUpdateShippingModalVisible(true);
  };

  // Handler to open Return Reason Modal
  const handleReturnReason = (orderId) => {
    setCurrentOrderId(orderId);
    const order = filteredData.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    // Set initial value for the form based on existing return reason
    returnReasonForm.setFieldsValue({ returnReason: order.returnReason || '' });
    setIsReturnReasonModalVisible(true);
  };

  const handleViewProducts = (orderId) => { 
    const order = filteredData.find((order) => order.orderId === orderId); 
    setSelectedOrder(order); 
    setIsModalVisible(true); 
  }; 

  const handleModalClose = () => { 
    setIsModalVisible(false); 
    setSelectedOrder(null); 
  }; 

  const handleCategoryChange = (value) => { 
    setSelectedCategory(value); 
  }; 

  const handleSearch = (searchText) => { 
    const filtered = dataOrders.filter((item) => { 
      const columnKey = selectedCategory; 
      return item[columnKey] && item[columnKey].toString().toLowerCase().includes(searchText.toLowerCase()); 
    }); 
    setFilteredData(filtered); 
  }; 

 

  // Submit handler for Update Shipping Progress
  const handleUpdateShippingSubmit = () => {
    shippingForm.validateFields()
      .then(values => {
        // Implement the logic to update shipping progress
        console.log('Update Shipping Progress for Order ID:', currentOrderId, values);
        // Update the orderStatus based on form input
        handleStatusChange(currentOrderId, values.shippingStatus);
        setIsUpdateShippingModalVisible(false);
        shippingForm.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // Submit handler for Return Reason
  const handleReturnReasonSubmit = () => {
    returnReasonForm.validateFields()
      .then(values => {
        // Implement the logic to handle return reasons
        console.log('Return Reason for Order ID:', currentOrderId, values);
        // Update the order with return reason
        const updatedOrders = filteredData.map((order) => { 
          if (order.orderId === currentOrderId) { 
            return { ...order, returnReason: values.returnReason };
          } 
          return order; 
        }); 
        setFilteredData(updatedOrders); 
        message.success('Return reason recorded successfully');
        setIsReturnReasonModalVisible(false);
        returnReasonForm.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

 

  

  // Define columnsOrder inside the component to access handleStatusChange and action handlers
  const columnsOrder = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'left' },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      filters: [
        { text: 'Khách hàng', value: 'Khách hàng' },
        { text: 'Nhân viên bán hàng', value: 'Nhân viên bán hàng' },
        { text: 'Nhân viên kho', value: 'Nhân viên kho' },
      ],
      onFilter: (value, record) => record.type === value,
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
      render: (gender) => (gender === 'male' ? 'Nam' : 'Nữ'),
      filters: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'birthDate',
      key: 'birthDate',
      align: 'left',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      render: (status, record) => (
        <Select
          defaultValue={status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Select.Option value="active">Hoạt động</Select.Option>
          <Select.Option value="inactive">Không hoạt động</Select.Option>
        </Select>
      ),
      filters: [
        { text: 'Hoạt động', value: 'active' },
        { text: 'Không hoạt động', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];
  
  // Cập nhật hàm handleStatusChange để cập nhật trạng thái trong state
  const handleStatusChange = (orderId, status) => {
    const updatedStatus = status === 'Hoạt động' ? 'active' : 'inactive';
    const updatedOrders = filteredData.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: updatedStatus };
      }
      return order;
    });
    setFilteredData(updatedOrders);
    
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
          </div> 
        </Col> 
      </Row> 

      <AdminTableComponent 
        title="Tài khoản" 
        columns={columnsOrder} 
        data={filteredData} 
      /> 

      
    </div> 
  ); 
}; 

export default AdminManageAccount;
