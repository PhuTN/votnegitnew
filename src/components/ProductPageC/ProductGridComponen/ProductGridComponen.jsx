import React, { useState } from 'react';
import styled from 'styled-components';
import { Select, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const Container = styled.div`
  width: 100%;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: #e6f7ff;
  padding: 0px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 170px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ProductTitle = styled.p`
  font-size: 14px;
  color: #333;
  margin: 8px 0;
  text-align: left;
  ${ProductCard}:hover & {
    color: #1DA0F1; 
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  text-align: left;
`;

const ProductPrice = styled.span`
  color: #d0021b;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
`;

const DiscountBadge = styled.span`
  background-color: #fe0137;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ProductItem = ({ product }) => {
  const discountPercentage =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <ProductCard>
      {discountPercentage > 0 && <DiscountBadge>-{discountPercentage}%</DiscountBadge>}
      <ProductImage src={product.image} alt={product.name} />
      <ProductTitle>{product.name}</ProductTitle>
      <PriceContainer>
        {product.originalPrice && (
          <OriginalPrice>{product.originalPrice.toLocaleString()} đ</OriginalPrice>
        )}
        <ProductPrice>{product.price.toLocaleString()} đ</ProductPrice>
      </PriceContainer>
    </ProductCard>
  );
};

const ProductGridComponent = ({ products }) => {
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  let sortedProducts = [...products];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "newest") {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Chỉnh sửa để sử dụng createdAt
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <Title>Vợt Cầu Lông</Title>
        <Select defaultValue="default" onChange={handleSortChange} style={{ width: 150 ,textAlign:'center'}} >
          <Option value="default">Mặc định</Option>
          <Option value="asc">Giá tăng dần</Option>
          <Option value="desc">Giá giảm dần</Option>
          <Option value="newest">Hàng mới nhất</Option>
        </Select>
      </Header>

      <ProductGrid>
        {currentProducts.map((product) => (
          <Link to = '/product/product-detail' style={{textDecoration:'none'}}>
          <ProductItem key={product.id} product={product} />
          </Link>
        ))}
      </ProductGrid>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={sortedProducts.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </Container>
  );
};

export default ProductGridComponent;
