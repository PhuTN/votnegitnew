import React, { useState } from 'react';
import { deleteI, ItemName, CartContainer, CartHeader, CartItemContainer, ItemPrice, TotalContainer, CheckoutButtonStyled, ItemDetails } from './style';
import { Image } from 'antd';
import './style.css';
import Bag from '../../../images/Bag.svg';

const OrderProduct = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Vợt Cầu Lông Lining Turbo Charging Marshal',
            price: 529000,
            quantity: 2,
            image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp'
        },
        {
            id: 2,
            name: 'Vợt cầu lông VNB V200 Xanh chính hãng',
            price: 529000,
            quantity: 3,
            image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp'
        }
    ]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContainer>
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', margin: '20px 0', color: '#888' }}>
                    <Image 
                        width={100} 
                        src={Bag} 
                        style={{ marginRight: '50px' }}
                    />
                    Chưa có sản phẩm trong giỏ hàng
                </div>
            ) : (
                cartItems.map(item => (
                    <CartItemContainer key={item.id}>
                        <img src={item.image} alt={item.name} width={'50px'} />
                        <ItemDetails>
                            <ItemName>{item.name}</ItemName>
                            <div style={{ marginRight: '55px' }}>Số lượng: {item.quantity}</div>
                        </ItemDetails>
                        <ItemDetails>
                            <ItemPrice>{(item.price * item.quantity).toLocaleString()} đ</ItemPrice>
                        </ItemDetails>
                    </CartItemContainer>
                ))
            )}
            {cartItems.length > 0 && (
                <TotalContainer>
                    Tổng tiền: <span style={{ color: 'red' }}>{calculateTotal().toLocaleString()} đ</span>
                </TotalContainer>
                
            )}
            
        </CartContainer>
    );
};

export default OrderProduct;
