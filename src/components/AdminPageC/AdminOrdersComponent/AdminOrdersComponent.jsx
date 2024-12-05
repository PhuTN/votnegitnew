import React, { useState, useContext, useEffect } from 'react'; 
import { Modal, Table, Button, Select, Input, Row, Col, Tooltip, Form, message } from 'antd'; 
import { EditOutlined, UndoOutlined } from '@ant-design/icons'; // Importing necessary icons
import { orderCategories } from '../../../models/fake-data'; 
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent'; 
import { AppContexts } from '../../../contexts/AppContexts';
const AdminOrdersComponent = () => { 
  const {orders} = useContext(AppContexts);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [filteredData, setFilteredData] = useState(orders); 
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
    const order = filteredData.find((order) => order._id === orderId);
    setSelectedOrder(order);
    // Set initial value for the form based on current shipping status
    shippingForm.setFieldsValue({ shippingStatus: order.shippingStatus || '' });
    setIsUpdateShippingModalVisible(true);
  };

  // Handler to open Return Reason Modal
  const handleReturnReason = (orderId) => {
    setCurrentOrderId(orderId);
    const order = filteredData.find((order) => order._id === orderId);
    setSelectedOrder(order);
    // Set initial value for the form based on existing return reason
    returnReasonForm.setFieldsValue({ returnReason: order.returnReason || '' });
    setIsReturnReasonModalVisible(true);
  };

  const handleViewProducts = (orderId) => {
    const order = filteredData.find((order) => order._id === orderId);
    if (order) {
      console.log('Selected Order:', order);
      setSelectedOrder(order);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 0);
    } else {
      console.log('Order not found');
    }
  };
  
  
  

  const handleModalClose = () => { 
    setIsModalVisible(false); 
    setSelectedOrder(null); 
  }; 

  const handleCategoryChange = (value) => { 
    setSelectedCategory(value); 
  }; 

  const handleSearch = (searchText) => { 
    const filtered = orders.filter((item) => { 
      const columnKey = selectedCategory; 
      return item[columnKey] && item[columnKey].toString().toLowerCase().includes(searchText.toLowerCase()); 
    }); 
    setFilteredData(filtered); 
  }; 

  const handleStatusChange = (orderId, status) => { 
    const updatedOrders = filteredData.map((order) => { 
      if (order._id === orderId) { 
        return { ...order, orderStatus: status }; // Update orderStatus
      } 
      return order; 
    }); 
    setFilteredData(updatedOrders); 
    message.success('Order status updated successfully');
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

  const productColumns = [
    {
      title: "ID",
      key: "id",
      render: (_, record) => record.productId?._id || "No ID",
    },
    {
      title: "Hình ảnh",
      key: "image",
      render: (_, record) => {
        const selectedType = record.productId?.type.find(
          (type) => type.color === record.color
        );
        return selectedType?.images?.main ? (
          <img
            src={selectedType.images.main}
            alt="Product"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          "No Image"
        );
      },
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      render: (_, record) => record.productId?.name || "No Name",
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) =>
        record.quantity != null ? record.quantity : "No Quantity",
    },
    {
      title: "Giá",
      key: "price",
      render: (_, record) =>
        record.price != null
          ? `${record.price.toLocaleString()} VND`
          : "No Price",
    },
  ];
  
  
  

  // const productsData = selectedOrder
  //   ? [
  //       { id: 1, name: 'Vợt Cầu Lông Lining Turbo Charging Marshal', price: 529000, quantity: 2, image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
  //       { id: 2, name: 'Giày cầu lông Yonex Power Cushion', price: 1290000, quantity: 1, image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
  //       { id: 3, name: 'Giày cầu lông Yonex Power Cushion', price: 1290000, quantity: 1, image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
  //     ]
  //   : [];

  // Define columnsOrder inside the component to access handleStatusChange and action handlers
  const columnsOrder = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      align: 'left',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'products',
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewProducts(record._id)}>
          Xem sản phẩm
        </Button>
      ),
      align: 'left',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'userId.name',
      key: 'name',
      align: 'left',
      render: (_, record) => record?.userId?.name || 'Không có tên khách hàng',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'userId.phone',
      key: 'phone',
      align: 'left',
      render: (_, record) => record?.userId?.phone || 'Không có số điện thoại',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      align: 'left',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (amount) => amount != null ? `${amount.toLocaleString()} VND` : 'Không có tổng tiền',
      align: 'left',
      sorter: (a, b) => a.totalAmount - b.totalAmount, // Numeric sorting
    },
    {
      title: 'Email',
      dataIndex: 'userId.email',
      key: 'email',
      align: 'left',
      render: (_, record) => record?.userId?.email || 'Không có email',
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'userId._id',
      key: 'userId._id',
      align: 'left',
      render: (_, record) => record?.userId?._id || 'Không có mã khách hàng',
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'state',
      key: 'state',
      align: 'left',
      filters: [
        { text: 'Đang xử lý', value: 'Pending' },
        { text: 'Đã giao hàng', value: 'Done' },
        { text: 'Đã hủy', value: 'Cancel' },
        { text: 'Xử lý đổi trả', value: 'Refund' },
        { text: 'Đang giao hàng', value: 'Shipping' },
        { text: 'Xác nhận đơn', value: 'Confirming' },
      ],
      onFilter: (value, record) => record.orderStatus === value,
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 150 }}
          options={[
            { label: 'Đang xử lý', value: 'Pending' },
            { label: 'Đã giao hàng', value: 'Done' },
            { label: 'Đã hủy', value: 'Cancel' },
            { label: 'Xử lý đổi trả', value: 'Refund' },
            { label: 'Đang giao hàng', value: 'Shipping' },
            { label: 'Xác nhận đơn', value: 'Confirming' },
          ]}
          onChange={(value) => handleStatusChange(record.orderId, value)}
        />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date) => new Date(date).toLocaleDateString(),
      align: 'left',
      sorter: (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated), // Date sorting
    },
    {
      title: 'Hành động', // Action Column
      key: 'action',
      align: 'center',
      render: (_, record) => {
        const isReturning = record.orderStatus === 'returning';
        const isProcessing = record.orderStatus === 'processing';
        return (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Tooltip title={isProcessing ? "Cập nhật quá trình vận chuyển" : "Không thể cập nhật quá trình vận chuyển"}>
              <Button 
                type="primary" 
                shape="circle" 
                icon={<EditOutlined />} 
                onClick={() => handleUpdateShipping(record.orderId)}
                disabled={!isProcessing}
              />
            </Tooltip>
            <Tooltip title={isReturning ? "Nguyên nhân đổi trả" : "Không thể nhập nguyên nhân đổi trả"}>
              <Button 
                type="primary" 
                shape="circle" 
                icon={<UndoOutlined />} 
                onClick={() => handleReturnReason(record.orderId)}
                disabled={!isReturning}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  console.log('Items:', selectedOrder?.items);

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
        title="Đơn hàng" 
        columns={columnsOrder} 
        data={filteredData} 
      /> 

      {/* Modal for Viewing Products */}
      <Modal 
        title="Chi tiết sản phẩm" 
        visible={isModalVisible} 
        onCancel={handleModalClose} 
        footer={null} 
        width={1000} 
      > 
         <Table 
    columns={productColumns} 
    dataSource={selectedOrder?.items || []} 
    pagination={false} 
    rowKey={(record) => record._id || record.productId?._id || Math.random()} 
  />  
      </Modal> 

      {/* Modal for Updating Shipping Progress */}
      <Modal
        title="Cập nhật quá trình vận chuyển"
        visible={isUpdateShippingModalVisible}
        onCancel={() => setIsUpdateShippingModalVisible(false)}
        onOk={handleUpdateShippingSubmit}
        okText="Cập nhật"
      >
        <Form
          form={shippingForm}
          layout="vertical"
          name="update_shipping_form"
        >
          <Form.Item
            name="shippingStatus"
            label="Trạng thái vận chuyển"
            rules={[{ required: true, message: 'Vui lòng nhập trạng thái vận chuyển!' }]}
          >
            <Input placeholder="Nhập trạng thái vận chuyển" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Return Reason */}
      <Modal
        title="Nguyên nhân đổi trả"
        visible={isReturnReasonModalVisible}
        onCancel={() => setIsReturnReasonModalVisible(false)}
        onOk={handleReturnReasonSubmit}
        okText="Ghi nhận"
      >
        <Form
          form={returnReasonForm}
          layout="vertical"
          name="return_reason_form"
        >
          <Form.Item
            name="returnReason"
            label="Nguyên nhân"
            rules={[{ required: true, message: 'Vui lòng nhập nguyên nhân đổi trả!' }]}
          >
            <Input.TextArea 
              rows={4} 
             
              readOnly// Read-only if returnReason exists
            />
          </Form.Item>
        </Form>
      </Modal>
    </div> 
  ); 
}; 

export default AdminOrdersComponent;
