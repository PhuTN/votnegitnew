import React from 'react';
import styled from 'styled-components';
import { Checkbox, Collapse, Input } from 'antd';

const { Panel } = Collapse;

const SidebarContainer = styled.div`
  width: 280px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 15px;
`;

const ScrollableSection = styled.div`
  max-height: 150px;
  overflow-y: auto;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px; 
`;

const CustomPanel = styled(Panel)`
  .ant-collapse-header {
    background-color: #e6f7ff; /* Light blue background */
    color: #1890ff; /* Primary color for text */
    padding: 10px;
    font-weight: 500;
    border-radius: 4px; /* Slightly rounded corners */
  }
`;

const FilterSideBarComponent = ({ filters }) => {
  // Generate an array of all keys to expand all panels by default
  const defaultKeys = filters.map((filter, index) => filter.key || index);

  return (
    <SidebarContainer>
      <Collapse defaultActiveKey={defaultKeys}>
        {filters.map((filter, index) => (
          <CustomPanel header={filter.label} key={filter.key || index}>
            {filter.searchable && (
              <Input placeholder={`Tìm ${filter.label.toLowerCase()}`} />
            )}
            <ScrollableSection>
              {filter.items.map((item) => (
                <CheckboxWrapper key={typeof item === 'string' ? item : item.value}>
                  <Checkbox>
                    {typeof item === 'string' ? item : item.label}
                  </Checkbox>
                </CheckboxWrapper>
              ))}
            </ScrollableSection>
          </CustomPanel>
        ))}
      </Collapse>
    </SidebarContainer>
  );
};

export default FilterSideBarComponent;
