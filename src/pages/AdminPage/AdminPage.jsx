import React, { useState } from 'react';
import {
  DashboardOutlined,
  ProductOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  PictureOutlined,
  PercentageOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Avatar, Button, Col, Image, Row } from 'antd';

import { AdminMenu } from './style';
import logovot from '../../images/Logo.svg';

import AdminDashboardComponent from '../../components/AdminPageC/AdminDashboardComponent/AdminDashboardComponent';
import AdminOrdersComponent from '../../components/AdminPageC/AdminOrdersComponent/AdminOrdersComponent';
import CatagoryItemComponent from '../../components/AdminPageC/CatagoryItemComponent/CatagoryItemComponent';
import AdminProductComponent from '../../components/AdminPageC/AdminProductComponent/AdminProductComponent';
import AdminProductDetail from '../../components/AdminPageC/AdminProductDetail/AdminProductDetail';
import AdminManageAccount from '../../components/AdminPageC/AdminManageAccount/AdminManageAccount';
import AdminReport from '../../components/AdminPageC/AdminReport/AdminReport';

const itemMenu = [
  { label: "Tổng quan", key: "dashboard", icon: <DashboardOutlined />, component: AdminDashboardComponent },
  { label: "Đơn hàng", key: "orders", icon: <ShoppingCartOutlined />, component: AdminOrdersComponent },
  {
    label: "Sản phẩm", 
    key: "products", 
    icon: <GiftOutlined />, 
    children: [
      { label: "Vợt", key: "votp", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Giày", key: "giayp", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Áo", key: "aop", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Váy", key: "vayp", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Quần", key: "quanp", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Túi vợt", key: "tui_votp", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Ba lô", key: "ba_lop", icon: <GiftOutlined />, component: AdminProductComponent },
      { label: "Phụ kiện", key: "phu_kienp", icon: <GiftOutlined />, component: AdminProductComponent }
    ]
  },
  {
    label: "Danh mục", 
    key: "category",  
    icon: <ProductOutlined />, 
    children: [
      { label: "Vợt", key: "vot", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Giày", key: "giay", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Áo", key: "ao", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Váy", key: "vay", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Quần", key: "quan", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Túi vợt", key: "tui_vot", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Ba lô", key: "ba_lo", icon: <ProductOutlined />, component: CatagoryItemComponent },
      { label: "Phụ kiện", key: "phu_kien", icon: <ProductOutlined />, component: CatagoryItemComponent }
    ]
  },
  { label: "Tài khoản người dùng", key: "accounts", icon: <UserOutlined />,component: AdminManageAccount},
  { label: "Doanh thu", key: "income", icon: <DollarCircleOutlined /> , component: AdminReport},
  // { label: "Khuyến mãi", key: "discounts", icon: <PercentageOutlined /> },
  
  { label: "Giao diện & Hình ảnh", key: "interfaces", icon: <PictureOutlined />},
];

// Hàm tìm component và trả về cả component và title
const findComponentByKey = (key) => {
  for (let item of itemMenu) {
    if (item.key === key) {
      return { component: item.component, title: item.label };
    }
    if (item.children) {
      const childItem = item.children.find(child => child.key === key);
      if (childItem) {
        return { component: childItem.component, title: childItem.label };
      }
    }
  }
  return { component: null, title: '' };
};

// Hàm render component với title truyền vào
const renderComponent = (key, handleRowSelect) => {
  const { component: Component, title } = findComponentByKey(key);
  return Component ? <Component title={title} handleRowSelect={handleRowSelect}/> : <div>{key}</div>;
};

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [selectedRow, setSelectedRow] = useState(null); // Thêm state mới

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const changeKey = (e) => {
    setSelectedKey(e.key);
    setSelectedRow(null); // Reset selectedRow mỗi khi chọn mục mới
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row); // Cập nhật hàng được chọn
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Row align="middle" style={{ backgroundColor: "#dff5ff", padding: "10px 20px", borderBottom: "1px solid #d9d9d9" }}>
        <Col flex="auto">
          <Image width={50} src={logovot} />
        </Col>
        <Col>
          <Button icon={<BellOutlined />} style={{ marginRight: "15px" }} />
          <Button icon={<LogoutOutlined />} style={{ marginRight: "15px" }} />
          <span>Phú Trần Ngọc</span>
        </Col>
      </Row>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Menu */}
        <div
          style={{
            width: collapsed ? '80px' : '250px',
            transition: 'width 0.3s',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #d9d9d9',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1000,
            userSelect: 'none'
          }}
        >
          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                transform: collapsed ? 'translateX(0)' : 'translateX(170px)',
                transition: 'transform 0.3s ease-in-out'
              }}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <AdminMenu
              onClick={changeKey}
              selectedKeys={[selectedKey]}
              mode="inline"
              inlineCollapsed={collapsed}
              style={{ height: '100%', borderRight: 0 }}
              items={itemMenu}
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          {selectedRow ? (
            <AdminProductDetail></AdminProductDetail>
          ) : (
            renderComponent(selectedKey, handleRowSelect)
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
