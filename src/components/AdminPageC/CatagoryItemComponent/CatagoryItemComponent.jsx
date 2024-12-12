import React, { useEffect, useState } from "react";
import { Table, Row, Col, Select, Button, Modal, Input, Form, notification, message } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { bulkUpdateAttributes, fetchAttributesByType } from "../../../redux/Slicer/attributeSlice";

const { Option } = Select;


const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
  const randomHex = () => Math.random().toString(16).substr(2, 8); // 8 hex chars
  return (timestamp + randomHex() + randomHex()).substr(0, 24); // Đảm bảo đúng 24 ký tự
};
const CatagoryItemComponent = ({ title }) => {
  const dispatch = useDispatch();
  const reduxAttributes = useSelector((state) => state.attributes.attributes);

  const [attributes, setAttributes] = useState([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false);
  const [isValueModalVisible, setIsValueModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (title) {
      dispatch(fetchAttributesByType(title)); // Lấy dữ liệu từ Redux
    }
  }, [dispatch, title]);

  useEffect(() => {
    if (reduxAttributes) {
      setAttributes(reduxAttributes); // Khởi tạo state nội bộ từ Redux
    }
  }, [reduxAttributes]);

console.log("HELLO")
console.log(attributes)
console.log("HELLO")

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (isAdding) {
        if (isAttributeModalVisible) {
          // Thêm mới thuộc tính
          const newAttribute = {
            _id: generateObjectId(),
            id: Math.random().toString(36).substring(7), // ID tạm
            name: values.attribute,
            active: values.status === "Hoạt động",
            type: title,
            values: [],
          };
          setAttributes([...attributes, newAttribute]);
        } else if (isValueModalVisible && selectedAttributeId) {
          // Thêm mới giá trị
          setAttributes(
            attributes.map((attr) =>
              attr.id === selectedAttributeId
                ? { 
                    ...attr,
                    values: [
                      ...attr.values,
                      {
                        _id: generateObjectId(),
                        id: Math.random().toString(36).substring(7), // ID tạm
                        value: values.attribute,
                        active: values.status === "Hoạt động",
                      },
                    ],
                  }
                : attr
            )
          );
        }
      } else {
        if (isAttributeModalVisible) {
          // Chỉnh sửa thuộc tính
          setAttributes(
            attributes.map((attr) =>
              attr.id === editData.id
                ? { ...attr, name: values.attribute, active: values.status === "Hoạt động" }
                : attr
            )
          );
        } else if (isValueModalVisible && selectedAttributeId) {
          // Chỉnh sửa giá trị
          setAttributes(
            attributes.map((attr) =>
              attr.id === selectedAttributeId
                ? {
                    ...attr,
                    values: attr.values.map((val) =>
                      val.id === editData.id
                        ? { ...val, value: values.attribute, active: values.status === "Hoạt động" }
                        : val
                    ),
                  }
                : attr
            )
          );
        }
      }

      notification.success({
        message: isAdding ? "Thêm mới thành công" : "Cập nhật thành công",
        description: isAdding ? "Dữ liệu đã được thêm thành công!" : "Dữ liệu đã được cập nhật thành công!",
      });

      setIsAttributeModalVisible(false);
      setIsValueModalVisible(false);
      setEditData(null);
      form.resetFields();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const showEditModal = (record, isValue, isAdding = false) => {
    setIsAdding(isAdding);
    setEditData(isAdding ? null : record);
    form.setFieldsValue({
      attribute: isAdding ? "" : record.value || record.name,
      status: isAdding ? "Hoạt động" : record.active ? "Hoạt động" : "Không hoạt động",
    });
    if (isValue) {
      setIsValueModalVisible(true);
    } else {
      setIsAttributeModalVisible(true);
    }
  };

  const handleAttributeClick = (record) => {
    setSelectedAttributeId(record.id);
  };

  const attributeColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Thuộc tính", dataIndex: "name", key: "name" },
    {
      title: "Tình trạng",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <Select
          defaultValue={record.active ? "Hoạt động" : "Không hoạt động"}
          style={{ width: 180 }}
          onChange={(value) => {
            setAttributes(
              attributes.map((attr) =>
                attr.id === record.id ? { ...attr, active: value === "Hoạt động" } : attr
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
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showEditModal(record, false)}
        />
      ),
    },
  ];

  const valueColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Giá trị", dataIndex: "value", key: "value" },
    {
      title: "Tình trạng",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <Select
          defaultValue={record.active ? "Hoạt động" : "Không hoạt động"}
          style={{ width: 180 }}
          onChange={(value) => {
            setAttributes(
              attributes.map((attr) =>
                attr.id === selectedAttributeId
                  ? {
                      ...attr,
                      values: attr.values.map((val) =>
                        val.id === record.id
                          ? { ...val, active: value === "Hoạt động" }
                          : val
                      ),
                    }
                  : attr
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
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showEditModal(record, true)}
        />
      ),
    },
  ];

  const [isSaved, setIsSaved] = useState(false);

const handleSave2 = async () => {
    // Your save logic here
    dispatch(bulkUpdateAttributes(attributes))
    .unwrap()
    .then((response) => {
        console.log("Update successful:", response);
        // After successful save, set isSaved to true
        setIsSaved(true);
    })
    .catch((error) => {
        console.error("Update failed:", error);
    });
    message.success("Changes saved!");
};

// Use an effect to trigger re-render when isSaved changes
useEffect(() => {
    if (isSaved) {
        setIsSaved(false); // Reset isSaved state after re-render
        // You can optionally refetch or reset anything here if needed
    }
}, [isSaved]);
  return (
    <div>
    <Button  type="primary" style={{ width: "100px" }} onClick={() => handleSave2()}>
            Save
          </Button>
      <Row gutter={16}>
      
  <Col span={12}>
    <Row justify="space-between" align="middle">
      <h3>Danh sách Thuộc tính</h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showEditModal(null, false, true)}
      >
        Thêm Thuộc tính
      </Button>
    </Row>
    <Table
      dataSource={attributes}
      columns={attributeColumns}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => handleAttributeClick(record),
      })}
    />
  </Col>
  <Col span={12}>
    <Row justify="space-between" align="middle">
      <h3>
        {selectedAttributeId
          ? `Danh sách Giá trị của Thuộc tính: ${
              attributes.find((attr) => attr.id === selectedAttributeId)?.name || ""
            }`
          : "Vui lòng chọn một Thuộc tính"}
      </h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!selectedAttributeId}
        onClick={() => showEditModal(null, true, true)}
      >
        Thêm Giá trị
      </Button>
    </Row>
    <Table
      dataSource={
        attributes.find((attr) => attr.id === selectedAttributeId)?.values || []
      }
      columns={valueColumns}
      rowKey="id"
    />
  </Col>
</Row>

      <Modal
        visible={isAttributeModalVisible}
        title={isAdding ? "Thêm thuộc tính" : "Chỉnh sửa thuộc tính"}
        onCancel={() => setIsAttributeModalVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="attribute"
            label="Thuộc tính"
            rules={[{ required: true, message: "Vui lòng nhập thuộc tính!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Tình trạng">
            <Select>
              <Option value="Hoạt động">Hoạt động</Option>
              <Option value="Không hoạt động">Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={isValueModalVisible}
        title={isAdding ? "Thêm giá trị" : "Chỉnh sửa giá trị"}
        onCancel={() => setIsValueModalVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="attribute"
            label="Giá trị"
            rules={[{ required: true, message: "Vui lòng nhập giá trị!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Tình trạng">
            <Select>
              <Option value="Hoạt động">Hoạt động</Option>
              <Option value="Không hoạt động">Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CatagoryItemComponent;
