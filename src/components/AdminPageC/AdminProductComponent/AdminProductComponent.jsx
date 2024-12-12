import React, { useEffect } from 'react';
import { Row, Col } from 'antd';

import { categories, columnsProduct, dataProduct } from '../../../models/fake-data';
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import FilterSideBarComponent from '../../ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import { filtersData } from '../../../models/fake-data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttributesByType } from '../../../redux/Slicer/attributeSlice';
import { fetchProductsByType } from '../../../redux/Slicer/productSlice';
const AdminProductComponent = ({ title,handleRowSelect }) => {
  const handleChange = (value) => {
    // Handle change logic here
  };

  const dispatch = useDispatch();

  // Get the attributes state from Redux
  const { attributes, status, error } = useSelector((state) => state.attributes);
  
  useEffect(() => {
    if (title) {
      dispatch(fetchAttributesByType(title)); // Fetch attributes when the 'type' changes
    }
  }, [dispatch, title]); // Re-fetch when 'type' changes
      // Add more products as needed
  


      const { products, status2, error2 } = useSelector((state) => state.products);

      useEffect(() => {
        if (title) {
          dispatch(fetchProductsByType(title)); // Gọi API với type
        }
      }, [title, dispatch]);  // Chạy lại khi type thay đổi
    
      function filterProductsByAttributes(products, attributeValues) {
        return products.filter(product => {
          // Kiểm tra nếu tất cả giá trị trong attributeValues đều tồn tại trong product.attributeValues
          return attributeValues.every(attributeValue => 
            product.attributeValues.includes(attributeValue)
          );
        });
      }
      const checkboxState = useSelector((state) => state.checkbox);
      const productNew = filterProductsByAttributes(products, checkboxState[title] || [])
    
      

      const updatedProducts = productNew.map(product => {
        
        
        return {
          ...product,
          _id: product?._id,
          productID: product?.id,
          product: product?.name,
          brand: product?.brand,
          price: product?.colors[0].price,
          discountPrice: product?.colors[0].discountPrice,
          soldQuantity: product?.sold
        };
      });
      
  return (
    <Row gutter={16} style={{marginTop:'-30px'}}>
      <Col span={20}> 
      <AdminTableComponent
          title={title}
          onChange={handleChange}
         
          columns={columnsProduct}
          data={updatedProducts}
          onRowSelect={handleRowSelect} // Truyền hàm này
          
        />
      
      </Col>
      <Col span={4}> {/* Bảng - chiếm 18/24 cột */}
      <div style={{marginTop:'160px'}}>
        <FilterSideBarComponent filters={attributes}
          typeNe = {title}
        />
        </div>
      </Col>
    </Row>
  );
};

export default AdminProductComponent;
