import React, { useState } from 'react';
import { Table, Row, Col, Select, Button, Modal, Input, Form, notification } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { attributes, values } from '../../../models/fake-data';
import DecriptionEnterZone from '../DecriptionEnterZone/DecriptionEnterZone';


const { Option } = Select;

const CatagoryItemComponent = ({ title }) => {
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false);
  const [isValueModalVisible, setIsValueModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();

  const [attributesData, setAttributesData] = useState(attributes);
  const [valuesData, setValuesData] = useState(values);

  const showEditModal = (record, isValue, isAdding = false) => {
    setIsAdding(isAdding);
    setEditData(isAdding ? null : record);
    form.setFieldsValue({
      attribute: isAdding ? '' : record.value || record.attribute,
      status: isAdding ? 'Hoạt động' : record.status,
    });
    if (isValue) {
      setIsValueModalVisible(true);
    } else {
      setIsAttributeModalVisible(true);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const isDuplicateAttribute = attributesData.some(
        (item) => item.attribute === values.attribute && item.id !== (editData ? editData.id : null)
      );

      const isDuplicateValue = selectedAttributeId && valuesData[selectedAttributeId]
        ? valuesData[selectedAttributeId].some(
            (item) => item.value === values.attribute && item.id !== (editData ? editData.id : null)
          )
        : false;

      if (isDuplicateAttribute || isDuplicateValue) {
        notification.error({
          message: 'Thêm mới thất bại',
          description: 'Giá trị này đã tồn tại!',
        });
        return;
      }

      notification.success({
        message: isAdding ? 'Thêm mới thành công' : 'Cập nhật thành công',
        description: isAdding ? 'Dữ liệu đã được thêm thành công!' : 'Dữ liệu đã được cập nhật thành công!',
      });

      if (isAttributeModalVisible) {
        if (isAdding) {
          setAttributesData((prevAttributesData) => [
            ...prevAttributesData,
            { id: prevAttributesData.length + 1, attribute: values.attribute, status: values.status || 'Hoạt động' },
          ]);
        } else if (editData) {
          setAttributesData((prevAttributesData) =>
            prevAttributesData.map((item) =>
              item.id === editData.id ? { ...item, attribute: values.attribute, status: values.status } : item
            )
          );
        }
      }

      if (isValueModalVisible) {
        if (isAdding) {
          setValuesData((prevValuesData) => ({
            ...prevValuesData,
            [selectedAttributeId]: [
              ...(prevValuesData[selectedAttributeId] || []),
              { id: prevValuesData[selectedAttributeId]?.length + 1 || 1, value: values.attribute, status: values.status || 'Hoạt động' },
            ],
          }));
        } else if (editData && selectedAttributeId) {
          setValuesData((prevValuesData) => {
            const updatedValues = prevValuesData[selectedAttributeId].map((item) =>
              item.id === editData.id ? { ...item, value: values.attribute, status: values.status } : item
            );
            return { ...prevValuesData, [selectedAttributeId]: updatedValues };
          });
        }
      }

      setIsAttributeModalVisible(false);
      setIsValueModalVisible(false);
      setEditData(null);
      form.resetFields();
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleAttributeClick = (record) => {
    setSelectedAttributeId(record.id);
  };

  const attributeColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Thuộc tính', dataIndex: 'attribute', key: 'attribute' },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          defaultValue={record.status || 'Hoạt động'}
          style={{ width: 180 }}
          onChange={(value) => {
            setAttributesData((prevAttributesData) =>
              prevAttributesData.map((item) =>
                item.id === record.id ? { ...item, status: value } : item
              )
            );
          }}
        >
          <Option value="Hoạt động">Hoạt động</Option>
          <Option value="Không hoạt động">Không hoạt động</Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showEditModal(record, false)}
          style={{ backgroundColor: '#2ecc71', borderColor: '#2ecc71', color: '#fff' }}
        />
      ),
    },
  ];

  const valueColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Giá trị', dataIndex: 'value', key: 'value' },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          defaultValue={record.status || 'Hoạt động'}
          style={{ width: 180 }}
          onChange={(value) => {
            setValuesData((prevValuesData) => ({
              ...prevValuesData,
              [selectedAttributeId]: prevValuesData[selectedAttributeId].map((item) =>
                item.id === record.id ? { ...item, status: value } : item
              ),
            }));
          }}
        >
          <Option value="Hoạt động">Hoạt động</Option>
          <Option value="Không hoạt động">Không hoạt động</Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showEditModal(record, true)}
          style={{ backgroundColor: '#2ecc71', borderColor: '#2ecc71', color: '#fff' }}
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' ,border: '0.1px solid #dce1e3',boxShadow:'0px 0px 2px black'}}>
        <h3 style={{ fontSize: '18px', marginBottom: '50px' }}>{title}</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Table
            style={{ border: '0.1px solid #aadff0',borderRadius: '7px' }}
              title={() => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Danh sách thuộc tính</span>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showEditModal(null, false, true)}
                  >
                    Thêm mới
                  </Button>
                </div>
              )}
              dataSource={attributesData}
              columns={attributeColumns}
              pagination={false}
              rowKey="id"
              bordered
              onRow={(record) => ({
                onClick: () => handleAttributeClick(record),
              })}
            />
          </Col>
          <Col span={12}>
            <Table
            style={{ border: '0.1px solid #aadff0',borderRadius: '7px' }}
              title={() => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {selectedAttributeId
                      ? attributesData.find((attr) => attr.id === selectedAttributeId).attribute
                      : 'Giá trị'}
                  </span>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showEditModal(null, true, true)}
                    disabled={!selectedAttributeId}
                  >
                    Thêm mới
                  </Button>
                </div>
              )}
              dataSource={selectedAttributeId ? valuesData[selectedAttributeId] : []}
              columns={valueColumns}
              pagination={false}
              rowKey="id"
              bordered
            />
          </Col>
        </Row>

        <Modal
          title={isAdding ? 'Thêm mới' : 'Chỉnh sửa thuộc tính'}
          visible={isAttributeModalVisible}
          onCancel={() => setIsAttributeModalVisible(false)}
          onOk={handleSave}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="attribute"
              label={isAdding ? 'Tên thuộc tính mới' : 'Thuộc tính'}
              rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={isAdding ? 'Thêm mới giá trị' : 'Chỉnh sửa giá trị'}
          visible={isValueModalVisible}
          onCancel={() => setIsValueModalVisible(false)}
          onOk={handleSave}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="attribute"
              label={isAdding ? 'Tên giá trị mới' : 'Giá trị'}
              rules={[{ required: true, message: 'Vui lòng nhập giá trị!' }]}
            >
              <Input />
            </Form.Item>
            
          </Form>
        </Modal>
      </div>
      <div style={{ marginTop: '30px' ,border: '0.1px solid #dce1e3',borderRadius: '8px' ,boxShadow:'0px 0px 2px black'}}>
        <DecriptionEnterZone></DecriptionEnterZone>
      </div>
    </div>
  );
};

export default CatagoryItemComponent;
