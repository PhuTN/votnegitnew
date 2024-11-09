import React from 'react';
import { Row, Col } from 'antd';

import { categories, columnsProduct, dataProduct } from '../../../models/fake-data';
import AdminTableComponent from '../AdminTableComponent/AdminTableComponent';
import FilterSideBarComponent from '../../ProductPageC/FilterSideBarCombonent/FilterSideBarCombonent';
import { filtersData } from '../../../models/fake-data';
const AdminProductComponent = ({ title,handleRowSelect }) => {
  const handleChange = (value) => {
    // Handle change logic here
  };

  

  return (
    <Row gutter={16} style={{marginTop:'-30px'}}>
      <Col span={20}> 
      <AdminTableComponent
          title={title}
          onChange={handleChange}
         
          columns={columnsProduct}
          data={dataProduct}
          onRowSelect={handleRowSelect} // Truyền hàm này
          
        />
      
      </Col>
      <Col span={4}> {/* Bảng - chiếm 18/24 cột */}
      <div style={{marginTop:'160px'}}>
        <FilterSideBarComponent filters={filtersData}
          
        />
        </div>
      </Col>
    </Row>
  );
};

export default AdminProductComponent;
