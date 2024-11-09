import React, { useState } from 'react';
import { deleteI, ItemName, CartContainer, CartHeader, CartItemContainer, ItemPrice, TotalContainer, CheckoutButtonStyled, ItemDetails } from './style';
import { Image, InputNumber } from 'antd';
import './style.css'
import Bag from '../../../images/Bag.svg';
import { Link } from 'react-router-dom';

const CartComponent = ({ initialCartItems }) => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const updateQuantity = (id, value) => {
        const newCartItems = cartItems.map(item => 
            item.id === id ? { ...item, quantity: value } : item
        );
        setCartItems(newCartItems);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeItem = (id) => {
        const newCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(newCartItems);
    };

    return (
        <CartContainer>
            <CartHeader>GIỎ HÀNG </CartHeader>
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
                            <ItemName>
                                {item.name}
                            </ItemName>
                            <InputNumber 
                                min={1} 
                                defaultValue={item.quantity} 
                                onChange={value => updateQuantity(item.id, value)} 
                                style={{ marginRight: '55px' }}
                            />
                        </ItemDetails>
                        <ItemDetails>
                            <svg id='DeleteIcon' onClick={() => removeItem(item.id)} width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id='DeletePath' d="M11 10L15 14M11 14L15 10M2.7716 13.5185L7.43827 17.5185C7.80075 17.8292 8.26243 18 8.73985 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H8.73985C8.26243 6 7.80075 6.17078 7.43827 6.48149L2.7716 10.4815C1.84038 11.2797 1.84038 12.7203 2.7716 13.5185Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <ItemPrice>{(item.price * item.quantity).toLocaleString()} đ</ItemPrice>
                        </ItemDetails>
                    </CartItemContainer>
                ))
            )}
            {cartItems.length > 0 && (
                <>
                    <TotalContainer>
                        Tổng tiền: <span style={{ color: 'red' }}>{calculateTotal().toLocaleString()} đ</span>
                    </TotalContainer>
                    <Link style={{textDecoration:'none'}} to = '/order-detail/payment'>
                    <CheckoutButtonStyled>
                        ĐẶT HÀNG
                    </CheckoutButtonStyled>
                    </Link>
                </>
            )}
        </CartContainer>
    );
}

export default CartComponent;
