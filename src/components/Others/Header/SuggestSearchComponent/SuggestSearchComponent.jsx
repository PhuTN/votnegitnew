import React from 'react'
import {TagButton,ItemName,StyledCard,ProductImage,SuggestWrapper} from './style'
import { FireOutlined } from '@ant-design/icons';
import {  List, Tag } from 'antd';
const SuggestSearchComponent = () => {
    const products = [
        { name: 'Vợt Cầu Lông Yonex Astrox 3 DG', price: '1.349.000₫', img: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
        { name: 'SET Vợt Cầu Lông Yonex Astrox SV New 2024', price: '3.500.000₫', img: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
        { name: 'Vợt Cầu Lông Yonex Astrox BKEX', price: '1.750.000₫', img: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
        { name: 'Vợt Cầu Lông Yonex Astrox 77 Pro Xanh China Limited', price: '13.500.000₫', img: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp' },
      ];
  return (
    <SuggestWrapper>
      <h3 style ={{fontSize: '18px',marginBottom:'30px',marginLeft:'20px',textAlign: 'left'}}><FireOutlined  /> TÌM KIẾM NHIỀU NHẤT</h3>
      <div style={{ marginBottom: '16px' , borderBottom:'1px solid #d9d9d9' , paddingBottom:'20px'}}>
        {/* Các tag loại sản phẩm */}
        <TagButton>Cầu lông</TagButton>
        <TagButton>Giày cầu lông</TagButton>
        <TagButton>Áo cầu lông</TagButton>
        <TagButton>Quần cầu lông</TagButton>
      </div>
      <List
        dataSource={products}
        renderItem={item => (
          <StyledCard>
            <ProductImage src={item.img} alt={item.name} />
            <div>
              <ItemName >{item.name}</ItemName>
              <p style={{ color: 'red', fontWeight: 'bold' ,textAlign:'left' }}>{item.price}</p>
            </div>
          </StyledCard>
        )}
      />
    </SuggestWrapper>
  )
}

export default SuggestSearchComponent