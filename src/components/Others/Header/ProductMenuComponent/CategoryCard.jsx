import React from 'react';
import { Card, Col } from 'antd';
import { CategoryContainer, BrandItem, BrandList, CategoryTitle, SeeMore } from './style';

const CategoryCard = ({ title2, brands }) => {
    return (
        <Col span={4}>
            
                <CategoryContainer>
                    <CategoryTitle>{title2}</CategoryTitle>
                    <BrandList>
                        {brands.slice(0, 8).map((brand, index) => (
                            <BrandItem key={index}>Vợt cầu lông {brand}</BrandItem>
                        ))}
                    </BrandList>
                    <SeeMore>Xem thêm</SeeMore>
                </CategoryContainer>
            
        </Col>
    );
};

export default CategoryCard;
