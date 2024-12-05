import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const AccountInfoWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  width: 1200px;
  display: flex;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  height: 250px; 
`;

const OrderContainer = styled.div`
  flex: 2;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
`;

const Header = styled.div`
  background-color: #1DA0F1;
  color: #FFFFFF;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const InfoSection = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  padding: 5px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const EditButton = styled(Button)`
  background-color: #1DA0F1;
  border-color: #1DA0F1;
  color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    background-color: #e65c00;
    border-color: #e65c00;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const columns = [
  {
    title: 'Đơn hàng',
    dataIndex: '_id',
    key: 'orderNumber',
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Giá tiền',
    dataIndex: 'totalPrice',
    key: 'price',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'state',
    key: 'status',
  },
];

const AccountComponent = ({ personalInfo, orderData }) => {
  const navigate = useNavigate();

  return (
    <AccountInfoWrapper>
      <InfoContainer>
        <Header>THÔNG TIN TÀI KHOẢN</Header>
        <InfoSection>
          <InfoItem><InfoLabel>Họ tên:</InfoLabel> {personalInfo.name}</InfoItem>
          <InfoItem><InfoLabel>Số ĐT:</InfoLabel> {personalInfo.phone}</InfoItem>
          <InfoItem><InfoLabel>Địa chỉ:</InfoLabel> {personalInfo.address}</InfoItem>
          <Link to='/account/account-info' style={{ textDecoration: 'none' }}>
            <EditButton>SỬA THÔNG TIN CÁ NHÂN</EditButton>
          </Link>
        </InfoSection>
      </InfoContainer>

      <OrderContainer>
        <Header>ĐƠN HÀNG CỦA BẠN</Header>
        <InfoSection>
          <Table 
            dataSource={orderData} 
            columns={columns} 
            pagination={{ pageSize: 7 }} 
            locale={{ emptyText: 'Không có đơn hàng' }} 
            onRow={(record) => ({
              // onClick: () => {
                
              //   navigate(`/order/${record.orderNumber}`);
              // },

              onClick: () => {
                
                navigate(`/order-detail/${record._id}`);
              },
            })}
          />
        </InfoSection>
      </OrderContainer>
    </AccountInfoWrapper>
  );
};

export default AccountComponent;
