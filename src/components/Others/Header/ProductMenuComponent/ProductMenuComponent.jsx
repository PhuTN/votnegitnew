import React from 'react';
import { Row } from 'antd';
import CategoryCard from './CategoryCard'; // Đảm bảo import này đứng sau định nghĩa của CategoryCard

const ProductMenuComponent = () => {
    const categories = [
        {
            title: "Vợt Cầu Lông",
            brands: ["Yonex", "Victor", "Lining", "Mizuno", "Apacs", "VNB", "Proace", "Forza", "FlyPower", "Tenway"]
        },
        {
            title: "Giày Cầu Lông",
            brands: ["Yonex", "Victor", "Lining", "Kawasaki", "Mizuno", "Kumpoo", "Promax", "Babolat", "Sunbatta", "Apacs"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
        {
            title: "Áo Cầu Lông",
            brands: ["Yonex", "VNB", "Kamito", "Victor", "Lining", "DonexPro", "Alien Armour", "SFD", "Kawasaki", "Pebble Beach"]
        },
    ];

    return (
        <div>
        <Row gutter={[0, 0]}   style={{ margin:'20px',boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }  }>
            {categories.map((category, index) => (
                <CategoryCard key={index} title2={category.title} brands={category.brands} />
            ))}
        </Row>
        </div>
    );
};

export default ProductMenuComponent;
