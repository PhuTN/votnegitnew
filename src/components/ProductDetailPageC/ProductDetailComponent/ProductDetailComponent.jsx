import React, { useState } from 'react';  
import styled from 'styled-components';  
import { Button, Divider, Typography, Radio, Image } from 'antd';  
import { LeftOutlined, MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';  
import Gift from '../../../images/gift.gif';  

// Import các styled components 
import {   
  HighlightText, 
  StyledRadioButton, 
  CardWrapper,   
  ImageBlock,   
  ImageWrapper,   
  ThumbnailList,   
  ThumbnailWrapper,   
  Thumbnail,   
  NavButton,   
  InfoBlock,   
  Price,   
  Price2,   
  DiscountedPrice,   
  OfferSection,   
  OfferTitle,   
  BenefitList,   
  BenefitItem,   
  ActionsWrapper,   
  CustomButton,   
  OptionWrapper,   
  ChoiceBlock,   
  ChoiceImage,   
  RightSide,   
  QuantityWrapper,   
  QuantityButton,   
  QuantityDisplay   
} from './style';  
import { Link } from 'react-router-dom'; 

const { Title, Text } = Typography;  

const ProductDetailComponent = ({ product }) => {  
  const [color, setColor] = useState(product.colorOptions[0]);  
  const [selectedImage, setSelectedImage] = useState(color.images[0]);  
  const [startIndex, setStartIndex] = useState(0);  
  const [size, setSize] = useState(color.stock[0]?.size || '');  
  const [quantity, setQuantity] = useState(1);  

  const getAvailableStock = () => {  
    const selectedSizeStock = color.stock.find(option => option.size === size)?.stock || 0;  
    return selectedSizeStock;  
  };  

  const availableStock = getAvailableStock();  

  const increaseQuantity = () => {  
    if (quantity < availableStock) {  
      setQuantity(quantity + 1);  
    }  
  };  

  const decreaseQuantity = () => {  
    if (quantity > 1) setQuantity(quantity - 1);  
  };  

  const visibleThumbnails = color.images.slice(startIndex, startIndex + 5);  

  const handlePrev = () => {  
    if (startIndex > 0) setStartIndex(startIndex - 1);  
  };  

  const handleNext = () => {  
    if (startIndex < color.images.length - 5) setStartIndex(startIndex + 1);  
  };  

  return (  
    <CardWrapper>  
      <ImageBlock>  
        <ImageWrapper>  
          <Image src={selectedImage} alt="Vợt cầu lông" />  
        </ImageWrapper>  
        <ThumbnailList>  
          {startIndex > 0 && ( 
            <NavButton onClick={handlePrev}> 
              <LeftOutlined /> 
            </NavButton> 
          )} 
          <ThumbnailWrapper>  
            {visibleThumbnails.map((img, index) => (  
              <Thumbnail  
                key={index}  
                src={img}  
                alt={`Thumbnail ${index + 1}`}  
                active={selectedImage === img}  
                onClick={() => setSelectedImage(img)}  
              />  
            ))}  
          </ThumbnailWrapper>  
          {startIndex < color.images.length - 5 && ( 
            <NavButton onClick={handleNext}> 
              <RightOutlined /> 
            </NavButton> 
          )} 
        </ThumbnailList>  
      </ImageBlock>  

      <InfoBlock>  
        <Title level={4}>{product.name}</Title>  
        <Text type="secondary">Mã: <HighlightText>{product.code}</HighlightText></Text> 
        <br /> 
        <Text>Thương hiệu: <HighlightText>{product.brand}</HighlightText> | Tình trạng: <HighlightText>Còn {availableStock} sản phẩm</HighlightText></Text> 

        <Price>  
          {color.price}  
          <DiscountedPrice>{color.discountedPrice}</DiscountedPrice>  
        </Price>  

        <OfferSection>  
          <OfferTitle style={{ margin: '0px' }} orientation="left">  
            <img width={25} src={Gift} style={{ margin: '-10px 0px 0px -10px', padding: '10px 0 0 0' }} alt="gift icon" />  
            <span style={{ color: 'blue', fontSize: '20px', margin: '5px 0px 0px 5px' }}>ƯU ĐÃI</span>  
          </OfferTitle>  
          <BenefitList>  
            {product.benefits.map((benefit, index) => (  
              <BenefitItem key={index}>{benefit}</BenefitItem>  
            ))}  
          </BenefitList>  
        </OfferSection>  

        {product.colorOptions.length > 1 && (  
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '0 10px', width: '600px', margin: '20px 0' }}>  
            <Divider style={{ marginTop: '5px' }} orientation="left">Chọn Màu sắc</Divider>  
            <OptionWrapper>  
              {product.colorOptions.map((option) => (  
                <ChoiceBlock key={option.label}  isSelected={color.label === option.label}>  
                  <ChoiceImage src={option.images[0]} alt={option.label} />  
                  <RightSide>  
                    <Radio.Group onChange={() => {setColor(option); setSize(option.stock[0]?.size); setSelectedImage(option.images[0])}} value={color.label}>  
                      <Radio style={{ width: '100px', fontSize: '12px' }} value={option.label}>{option.label}</Radio>  
                    </Radio.Group>  
                    <Price2>{option.price}</Price2>  
                  </RightSide>  
                </ChoiceBlock>  
              ))}  
            </OptionWrapper>  
          </div>  
        )} 

        {color.stock.length > 1 && (  
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '10px 10px 20px 10px', width: '600px', margin: '20px 0' }}>  
            <Divider style={{ marginTop: '-5px' }} orientation="left">Chọn Size</Divider>  
            <Radio.Group   
              onChange={(e) => setSize(e.target.value)}   
              value={size}   
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}  
            >  
              {color.stock.filter(sizeOption => sizeOption.stock > 0).map((sizeOption) => (  
                <Radio.Button   
                  key={sizeOption.size}   
                  value={sizeOption.size}   
                  style={{   
                    width: '60px',  
                    textAlign: 'center',   
                    border: '2px solid #e0e0e0',  
                    backgroundColor: size === sizeOption.size ? '#f7fcfe' : 'white',  
                    border: size === sizeOption.size ? '2px solid #1DA0F1' : '2px solid #e0e0e0', 
                  }}  
                >  
                  {sizeOption.size}  
                </Radio.Button>  
              ))}  
            </Radio.Group>  
          </div>  
        )} 

        <ActionsWrapper>  
          <QuantityWrapper>  
            <QuantityButton onClick={decreaseQuantity} icon={<MinusOutlined />} />  
            <QuantityDisplay>{quantity}</QuantityDisplay>  
            <QuantityButton onClick={increaseQuantity} icon={<PlusOutlined />} />  
          </QuantityWrapper>  
        </ActionsWrapper>  
        <Link to='/order-detail/payment' style={{ textDecoration: 'none' }}> 
          <CustomButton type="primary" danger disabled={availableStock === 0}>Mua Ngay</CustomButton> 
        </Link>  
        <CustomButton type="default" disabled={availableStock === 0}>Thêm vào Giỏ hàng</CustomButton>  
      </InfoBlock>  
    </CardWrapper>  
  );  
};  

export default ProductDetailComponent;
