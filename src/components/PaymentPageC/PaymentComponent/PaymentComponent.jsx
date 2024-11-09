// CheckoutComponent.js
import React from 'react';
import { Input, Button, Radio, Space, Card } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const FormSection = styled.div`
  width: 60%;
  max-width: 600px;
  margin-right: 20px;
`;

const OrderSummarySection = styled.div`
  width: 30%;
  min-width: 300px;
`;

const OrderSummary = styled(Card)`
  margin-top: 20px;
`;

const PaymentButton = styled(Button)`
  width: 100%;
  margin: 5px 0;
`;

const ProductImageContainer = styled.div`
  display: inline-block;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
`;

const PaymentComponent = ({ products }) => {
  // Calculate total price for all products
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <Container>
      
      {/* Customer Information Section */}
      <FormSection>
        <h2>Vợt nè</h2>
        <h3>Thông tin nhận hàng</h3>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="Họ và tên người nhận hàng" />
          <Input placeholder="Số điện thoại" />
          <Input placeholder="Địa chỉ" />
          <Input placeholder="Email" />
          <TextArea rows={2} placeholder="Ghi chú đơn hàng (tùy chọn)" />
        </Space>
        
        <h3 style={{ marginTop: '20px' }}>Thanh toán</h3>
        <Radio.Group defaultValue="COD" style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
            <Radio value="bank">Thanh toán qua ngân hàng</Radio>
          </Space>
        </Radio.Group>
      </FormSection>
      
      {/* Order Summary Section */}
      <OrderSummarySection>
        <OrderSummary title={`Đơn hàng (${products.length} sản phẩm)`}>
          {products.map((product) => (
            <ProductDetails key={product.id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProductImageContainer>
                  <ProductImage src={product.image} alt={product.name} />
                </ProductImageContainer>
                <div style={{ marginLeft: '10px' }}>
                  <p>{product.name}</p>
                  <h3>{product.price.toLocaleString('vi-VN')} ₫</h3>
                </div>
              </div>
              <p style={{ margin: 0 }}>Số lượng: {product.quantity}</p>
            </ProductDetails>
          ))}
          <h3>Tổng cộng: {totalPrice.toLocaleString('vi-VN')} ₫</h3>
          <Space style={{ width: '100%' }}>
          <Link to = '/cart' style={{textDecoration:'none'}}>
            <Button style={{ flex: 1 }}>Sửa giỏ hàng</Button>
            </Link>
            <Button type="primary" style={{ flex: 1 }}>ĐẶT HÀNG</Button>
          </Space>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>
            - Giá trên chưa bao gồm phí vận chuyển. Phí vận chuyển sẽ được nhân viên báo khi xác nhận đơn hàng.
            <br />
            - Thời gian xử lý đơn hàng: Từ 8h00 - 17h thứ 2 đến thứ 7.
          </p>
        </OrderSummary>
      </OrderSummarySection>

    </Container> 
  );
};

export default PaymentComponent;
