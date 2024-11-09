import React from 'react';
import styled from 'styled-components';

import ProductDetailComponent from '../../components/ProductDetailPageC/ProductDetailComponent/ProductDetailComponent';
import SideBarProductType from '../../components/ProductDetailPageC/SideBarProductType/SideBarProductType';
import ProductDetails from '../../components/ProductDetailPageC/ProductDecriptionComponent/ProductDecriptionComponent';
import CustomBreadcrumb from '../../components/Others/CustomBreadScumb/CustomBreadScumb';

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  max-width: 1200px; /* Adjust this value to control the maximum width */
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  
  padding: 20px;
`;

const LeftSection = styled.div`
  flex: 3;
  margin-right: 20px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const StyledProductDetails = styled(ProductDetails)`
  margin-bottom: 15px; /* Thêm khoảng cách dưới cho ProductDetails */
`;

const ProductDetailPage = () => {
  const productData = {
    description: "This is a sample product description for Mô Tả Sản Phẩm.",
    specifications: [
      { label: "Trình Độ Chơi", value: ["Mới Chơi", "Khá Tốt"] },
  { label: "Nội Dung Chơi", value: ["Đơn", "Đôi"] },
  { label: "Phong Cách Chơi", value: ["Công Thủ Toàn Diện", "Tấn Công"] },
  { label: "Độ Cứng Đũa", value: ["Dẻo", "Trung Bình"] },
  { label: "Điểm Cân Bằng", value: ["Hơi Nặng Đầu", "Cân Bằng"] },
  { label: "Swingweight", value: ["82-84 kg/cm2", "85-87 kg/cm2"] },
  { label: "Chiều Dài Vợt", value: ["665 mm", "670 mm"] },
  { label: "Chiều Dài Cán Vợt", value: ["200 mm", "205 mm"] },
  { label: "Thương Hiệu", value: ["Yonex", "Lining"] },
  { label: "Mức Giá", value: ["Giá dưới 500.000đ", "500.000đ - 1 triệu"] },
  { label: "Chất Liệu", value: ["Cotton", "Polyester"] },

    ],
  };

  const product = { 
    name: "Vợt Cầu Lông VNB V200 Xanh Chính Hãng", 
    code: "VNB004563", 
    brand: "VNB", 
    status: "Hoạt động", 
    price: "529.000 đ", 
    discountedPrice: "900.000 đ", 
    colorOptions: [ 
      {  
        label: 'Xanh',  
        price: '600.000 đ',  
        discountedPrice: "900.000 đ",
        images: [
          "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp", 
          "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-002f-chinh-hang-1_1712621616.webp"
        ], 
        stock: [
          { size: '37', stock: 5 },
          { size: '38', stock: 3 },
          { size: '39', stock: 10 },
          { size: '40', stock: 4 }
        ]
      }, 
      {  
        label: 'Đỏ',  
        price: '650.000 đ',  
        discountedPrice: "900.000 đ",
        images: [
          "https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-yonex-nanoflare-002f-chinh-hang-1_1712621616.webp", 
          "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp"
        ],  
        stock: [
          { size: '37', stock: 2 },
          { size: '38', stock: 0 },
          { size: '39', stock: 5 },
          { size: '40', stock: 1 }
        ]
      }
    ],
    benefits: [
      "Tặng 1 đôi vớ cầu lông VNB", 
      "Sản phẩm cam kết chính hãng", 
      "Thanh toán sau khi kiểm tra"
    ]
  };
  

  const breadcrumbItems = [
    { path: '/', label: 'Trang Chủ' },
    { path: '/products', label: 'Vợt' },
  ];

  
  return (
    <div>
    <CustomBreadcrumb items={breadcrumbItems} />
      <ContainerWrapper>
        <Container>
          <LeftSection>
          <ProductDetailComponent product={product} />
            <StyledProductDetails product={productData} />
          </LeftSection>
          <RightSection>
            <SideBarProductType defaultActiveKey={[0]} /> {/* Expands the "Giày Cầu Lông" panel by default */}
          </RightSection>
        </Container>
      </ContainerWrapper>
    </div>
  );
};

export default ProductDetailPage;
