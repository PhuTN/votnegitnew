import React, { useContext } from 'react';
import styled from 'styled-components';

import FilterSideBarComponent from '../../components/ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import ProductGridComponent from '../../components/ProductPageC/ProductGridComponen/ProductGridComponen';
import CustomBreadcrumb from '../../components/Others/CustomBreadScumb/CustomBreadScumb';

import { filtersData } from '../../models/fake-data';

import { AppContexts } from '../../contexts/AppContexts';
const PageContainer = styled.div`
  display: flex;
  padding: 16px;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  flex: 0 0 300px; /* Fixed width for sidebar */
  margin-right: 16px;
`;

const Content = styled.div`
  flex: 1; /* Takes the remaining width for content */
`;



const ProductPage = () => {
    const {products} = useContext(AppContexts);
      

  const products2 = [
    {
        id: 1,
        name: 'Vợt Cầu Lông VNB V200 Xanh Chính Hãng',
        price: 880000,
        originalPrice: 1000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-06-21',
    },
    {
        id: 2,
        name: 'Vợt Cầu Lông VNB V400 Đỏ Chính Hãng',
        price: 950000,
        originalPrice: 1100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-08-30',
    },
    {
        id: 3,
        name: 'Vợt Cầu Lông Yonex Astrox 100',
        price: 4200000,
        originalPrice: 4600000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-07-15',
    },
    {
        id: 4,
        name: 'Vợt Cầu Lông Victor Brave Sword 12',
        price: 2700000,
        originalPrice: 3100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-03-30',
    },
    {
        id: 5,
        name: 'Vợt Cầu Lông Li-Ning N90 III',
        price: 2900000,
        originalPrice: 3300000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-11-14',
    },
    {
        id: 6,
        name: 'Vợt Cầu Lông VNB V300 Đen Chính Hãng',
        price: 1000000,
        originalPrice: 1200000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-02-20',
    },
    {
        id: 7,
        name: 'Vợt Cầu Lông Yonex Nanoflare 700',
        price: 3200000,
        originalPrice: 3600000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-05-25',
    },
    {
        id: 8,
        name: 'Vợt Cầu Lông Victor Meteor X 80',
        price: 3600000,
        originalPrice: 4000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-20',
    },
    {
        id: 9,
        name: 'Vợt Cầu Lông Li-Ning N55 II',
        price: 3200000,
        originalPrice: 3600000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-09-18',
    },
    {
        id: 10,
        name: 'Vợt Cầu Lông VNB V100 Đen Chính Hãng',
        price: 860000,
        originalPrice: 1020000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-04-12',
    },
    {
        id: 11,
        name: 'Vợt Cầu Lông Victor Superwave 30',
        price: 2900000,
        originalPrice: 3300000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-09-28',
    },
    {
        id: 12,
        name: 'Vợt Cầu Lông Yonex Duora 20',
        price: 3700000,
        originalPrice: 4100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-12-12',
    },
    {
        id: 13,
        name: 'Vợt Cầu Lông Li-Ning N7 II',
        price: 3400000,
        originalPrice: 3900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-30',
    },
    {
        id: 14,
        name: 'Vợt Cầu Lông VNB V300 Trắng Chính Hãng',
        price: 950000,
        originalPrice: 1150000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-06-05',
    },
    {
        id: 15,
        name: 'Vợt Cầu Lông Yonex Astrox 99',
        price: 4600000,
        originalPrice: 5000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-08-14',
    },
    {
        id: 16,
        name: 'Vợt Cầu Lông Victor Brave Sword 15',
        price: 2500000,
        originalPrice: 2800000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-05-11',
    },
    {
        id: 17,
        name: 'Vợt Cầu Lông Li-Ning N80',
        price: 4200000,
        originalPrice: 4600000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-07-30',
    },
    {
        id: 18,
        name: 'Vợt Cầu Lông VNB V200 Đen Chính Hãng',
        price: 850000,
        originalPrice: 1000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-04-02',
    },
    {
        id: 19,
        name: 'Vợt Cầu Lông VNB V100 Xanh Chính Hãng',
        price: 780000,
        originalPrice: 900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-08-22',
    },
    {
        id: 20,
        name: 'Vợt Cầu Lông Yonex Nanoflare 800',
        price: 4000000,
        originalPrice: 4500000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-05',
    },
    {
        id: 21,
        name: 'Vợt Cầu Lông Victor Superwave 35',
        price: 2900000,
        originalPrice: 3300000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-05-21',
    },
    {
        id: 22,
        name: 'Vợt Cầu Lông Li-Ning AERONAUT 9000C',
        price: 3100000,
        originalPrice: 3500000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-07-11',
    },
    {
        id: 23,
        name: 'Vợt Cầu Lông VNB V200 Vàng Chính Hãng',
        price: 780000,
        originalPrice: 900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-02-08',
    },
    {
        id: 24,
        name: 'Vợt Cầu Lông Yonex Voltric 7',
        price: 3600000,
        originalPrice: 4000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-09-15',
    },
    {
        id: 25,
        name: 'Vợt Cầu Lông Victor Meteor X 90',
        price: 3700000,
        originalPrice: 4100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-03-15',
    },
    {
        id: 26,
        name: 'Vợt Cầu Lông Li-Ning N90 IV',
        price: 3500000,
        originalPrice: 3900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-06-18',
    },
    {
        id: 27,
        name: 'Vợt Cầu Lông VNB V400 Trắng Chính Hãng',
        price: 910000,
        originalPrice: 1100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-04-30',
    },
    {
        id: 28,
        name: 'Vợt Cầu Lông Yonex Duora 10',
        price: 2800000,
        originalPrice: 3200000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-10-10',
    },
    {
        id: 29,
        name: 'Vợt Cầu Lông VNB V100 Đỏ Chính Hãng',
        price: 820000,
        originalPrice: 950000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-05-18',
    },
    {
        id: 30,
        name: 'Vợt Cầu Lông Victor Meteor X 80',
        price: 3500000,
        originalPrice: 4000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-09-05',
    },
    {
        id: 31,
        name: 'Vợt Cầu Lông Li-Ning N55 III',
        price: 3000000,
        originalPrice: 3400000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-11-20',
    },
    {
        id: 32,
        name: 'Vợt Cầu Lông VNB V200 Trắng Chính Hãng',
        price: 900000,
        originalPrice: 1100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-06-26',
    },
    {
        id: 33,
        name: 'Vợt Cầu Lông Yonex Astrox 99',
        price: 4500000,
        originalPrice: 4900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-07-25',
    },
    {
        id: 34,
        name: 'Vợt Cầu Lông Victor Brave Sword 12',
        price: 3000000,
        originalPrice: 3400000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-10-01',
    },
    {
        id: 35,
        name: 'Vợt Cầu Lông VNB V300 Xanh Chính Hãng',
        price: 950000,
        originalPrice: 1150000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-02-12',
    },
    {
        id: 36,
        name: 'Vợt Cầu Lông Yonex Nanoflare 300',
        price: 3900000,
        originalPrice: 4300000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-09-25',
    },
    {
        id: 37,
        name: 'Vợt Cầu Lông Victor Superwave 20',
        price: 2900000,
        originalPrice: 3200000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-10',
    },
    {
        id: 38,
        name: 'Vợt Cầu Lông VNB V200 Vàng Chính Hãng',
        price: 880000,
        originalPrice: 1000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-06-15',
    },
    {
        id: 39,
        name: 'Vợt Cầu Lông Li-Ning N7',
        price: 2900000,
        originalPrice: 3300000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-03-20',
    },
    {
        id: 40,
        name: 'Vợt Cầu Lông VNB V100 Đen Chính Hãng',
        price: 900000,
        originalPrice: 1050000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-07-09',
    },
    {
        id: 41,
        name: 'Vợt Cầu Lông Yonex Voltric 9',
        price: 3500000,
        originalPrice: 3900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-02-24',
    },
    {
        id: 42,
        name: 'Vợt Cầu Lông Victor Meteor X 70',
        price: 3700000,
        originalPrice: 4100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-28',
    },
    {
        id: 43,
        name: 'Vợt Cầu Lông Li-Ning N80 IV',
        price: 3300000,
        originalPrice: 3700000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-06-02',
    },
    {
        id: 44,
        name: 'Vợt Cầu Lông VNB V400 Đen Chính Hãng',
        price: 950000,
        originalPrice: 1100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-08-06',
    },
    {
        id: 45,
        name: 'Vợt Cầu Lông VNB V200 Đen Chính Hãng',
        price: 850000,
        originalPrice: 1000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-04-17',
    },
    {
        id: 46,
        name: 'Vợt Cầu Lông Li-Ning N90 II',
        price: 3700000,
        originalPrice: 4100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-02-28',
    },
    {
        id: 47,
        name: 'Vợt Cầu Lông Yonex Astrox 88',
        price: 4300000,
        originalPrice: 4700000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-11-30',
    },
    {
        id: 48,
        name: 'Vợt Cầu Lông VNB V400 Trắng Chính Hãng',
        price: 1000000,
        originalPrice: 1200000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-05-02',
    },
    {
        id: 49,
        name: 'Vợt Cầu Lông Victor Superwave 40',
        price: 2700000,
        originalPrice: 3100000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-09-10',
    },
    {
        id: 50,
        name: 'Vợt Cầu Lông Li-Ning AERONAUT 9000B',
        price: 3200000,
        originalPrice: 3600000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-12-01',
    },
    {
        id: 51,
        name: 'Vợt Cầu Lông VNB V300 Đen Chính Hãng',
        price: 950000,
        originalPrice: 1150000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-18',
    },
    {
        id: 52,
        name: 'Vợt Cầu Lông Yonex Nanoflare 200',
        price: 3000000,
        originalPrice: 3400000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-03-05',
    },
    {
        id: 53,
        name: 'Vợt Cầu Lông Victor Brave Sword 15',
        price: 2500000,
        originalPrice: 2900000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-04-08',
    },
    {
        id: 54,
        name: 'Vợt Cầu Lông VNB V100 Vàng Chính Hãng',
        price: 800000,
        originalPrice: 950000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-10-25',
    },
    {
        id: 55,
        name: 'Vợt Cầu Lông Yonex Duora 50',
        price: 3000000,
        originalPrice: 3500000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-12-22',
    },
    {
        id: 56,
        name: 'Vợt Cầu Lông Victor Meteor X 100',
        price: 3900000,
        originalPrice: 4300000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-01-15',
    },
    {
        id: 57,
        name: 'Vợt Cầu Lông Li-Ning N90 III',
        price: 3000000,
        originalPrice: 3400000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2022-11-15',
    },
    {
        id: 58,
        name: 'Vợt Cầu Lông VNB V200 Đỏ Chính Hãng',
        price: 850000,
        originalPrice: 1000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-05-08',
    },
    {
        id: 59,
        name: 'Vợt Cầu Lông Yonex Voltric 5',
        price: 3400000,
        originalPrice: 3800000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-02-16',
    },
    {
        id: 60,
        name: 'Vợt Cầu Lông VNB V300 Đen Chính Hãng',
        price: 880000,
        originalPrice: 1000000,
        image: 'https://cdn.shopvnb.com/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
        createdAt: '2023-06-10',
    },
];

const breadcrumbItems = [
  { path: '/', label: 'Trang Chủ' },
  { path: '/products', label: 'Vợt' },
];


  
    // Add more products as needed


  return (
    <div>
    <CustomBreadcrumb items={breadcrumbItems} />
    <div style={{width: '1200px', margin:' 0 auto' }}>
      
      
      <PageContainer>
        {/* Sidebar */}
        <Sidebar>
          <FilterSideBarComponent filters={filtersData} />
        </Sidebar>

        {/* Main Content */}
        <Content>
          <ProductGridComponent products={products} />
        </Content>
      </PageContainer>
    </div>
    </div>
  );
};

export default ProductPage;
