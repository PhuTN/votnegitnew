import React from 'react'
import SlideShowComponent from '../../components/HomePageC/SlideShowComponent/SlideShowComponent'
import InfoBlocksComponent from '../../components/HomePageC/InfoBlocksComponent/InfoBlocksComponent'
import ProductSliderComponent from '../../components/HomePageC/ProductSliderComponent/ProductSliderComponent'
import Gallery from '../../components/HomePageC/CatagoryComponent/Galary'
import RacketImage from '../../images/Racket.jpg';

const HomePage = () => {
  const slideImages = [
    {
      url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
      caption: 'Slide 1'
    },
    {
      url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
      caption: 'Slide 2'
    },
    {
      url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
      caption: 'Slide 3'
    },
  ];

  const tabItems = [
    { key: "all", label: "Tất cả" },
    { key: "Vợt", label: "Vợt Cầu Lông" },
    { key: "Giày", label: "Giày Cầu Lông" },
    { key: "Túi", label: "Túi Cầu Lông" },
    { key: "Balo1", label: "Balo Cầu Lông 1" },
    { key: "Balo2", label: "Balo Cầu Lông 2" },
    { key: "Balo3", label: "Balo Cầu Lông 3" },
    { key: "Balo4", label: "Balo Cầu Lông 4" },
    { key: "Balo5", label: "Balo Cầu Lông 5" },
    { key: "Balo6", label: "Balo Cầu Lông 6" },
  ];
  
  const products = [
    {
      id: 1,
      name: 'Vợt Cầu Lông VNB TC68B',
      price: 799000,
      originalPrice: 899000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Vợt',
    },
    {
      id: 2,
      name: 'Giày Cầu Lông Taro TR024-2',
      price: 499000,
      originalPrice: 599000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Giày',
    },
    {
      id: 3,
      name: 'Giày Cầu Lông Taro TR024-1',
      price: 499000,
      originalPrice: 599000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Giày',
    },
    {
      id: 4,
      name: 'Túi Cầu Lông Taro TR024-BAG01',
      price: 599000,
      originalPrice: 699000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Túi',
    },
    {
      id: 5,
      name: 'Balo Cầu Lông Taro TR024-BA01',
      price: 349000,
      originalPrice: 399000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Balo',
    },
    {
      id: 6,
      name: 'Vợt Cầu Lông Yonex NanoFlare 700',
      price: 1499000,
      originalPrice: 1599000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Vợt',
    },
    {
      id: 7,
      name: 'Vợt Cầu Lông Lining 3D Calibar',
      price: 1799000,
      originalPrice: 1899000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Vợt',
    },
    {
      id: 8,
      name: 'Giày Cầu Lông Mizuno Wave Fang',
      price: 1299000,
      originalPrice: 1399000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Giày',
    },
    {
      id: 9,
      name: 'Túi Cầu Lông Yonex BAG9826',
      price: 999000,
      originalPrice: 1099000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Túi',
    },
    {
      id: 10,
      name: 'Balo Cầu Lông Yonex BAG9632EX',
      price: 799000,
      originalPrice: 899000,
      imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
      category: 'Balo',
    },
  ];
  const itemsArray = [
    { src: RacketImage, text: "Vợt Cầu Lông" },
    { src: RacketImage, text: "Giày Cầu Lông" },
    { src: RacketImage, text: "Áo Cầu Lông" },
    { src: RacketImage, text: "Váy Cầu Lông" },
    { src: RacketImage, text: "Quần Cầu Lông" },
    { src: RacketImage, text: "Túi Vợt Cầu Lông" },
    { src: RacketImage, text: "Balo Cầu Lông" },
    { src: RacketImage, text: "Phụ Kiện Cầu Lông" },
  ];

  
  return (
    
    <div style={{height:'5000px'}}>
    
    <SlideShowComponent slideImages={slideImages} />
    <InfoBlocksComponent></InfoBlocksComponent>
    <ProductSliderComponent tabItems={tabItems} products={products} />
    <Gallery itemsArray={itemsArray} />;
    </div>
  )
}

export default HomePage
