import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Table, Button, Select, Image, Form, InputNumber, Modal, notification, Upload, Checkbox } from 'antd';
import { ContainerFilled, DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { filtersData } from '../../../models/fake-data';
import { product, productData } from '../../../models/fake-data';
import DecriptionEnterZone from '../DecriptionEnterZone/DecriptionEnterZone';
import { ImageBlock, ImageWrapper, ThumbnailList, ThumbnailWrapper, Thumbnail, NavButton, Wrapper, Container, LeftSection, RightSection, Title, StyledInput, TableWrapper } from './style';

const { Option } = Select;

const AdminProductDetail = () => {
  const [productState, setProductState] = useState(product);
  const [productDataState, setProductData] = useState(productData);
  const [formColorEdit] = Form.useForm();
  const [formStockEdit] = Form.useForm();
  const [formAddStock] = Form.useForm();
  const [formAddColor] = Form.useForm();
  const [formAttribute] = Form.useForm();
 
  const [startIndex, setStartIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [isStockModalVisible, setIsStockModalVisible] = useState(false);
  const [isAttributesModalVisible, setIsAttributesModalVisible] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [editingStock, setEditingStock] = useState(null);
  const [editingAttributes, setEditingAttributes] = useState(null);

  const handleCancelColorModal = () => setIsColorModalVisible(false);
  const handleCancelStockModal = () => setIsStockModalVisible(false);
  const handleCancelAttributesModal = () => setIsAttributesModalVisible(false);

  const handleOkAttributesModal = async () => {
    try {
      const values = await formAttribute.validateFields();
      const updatedSpecifications = productDataState.specifications.map((spec) =>
        spec.label === editingAttributes.attributeName
          ? { ...spec, value: values.selectedItems }
          : spec
      );
      setProductData((prevState) => ({
        ...prevState,
        specifications: updatedSpecifications,
      }));
      setIsAttributesModalVisible(false);
      setEditingAttributes(null);
    } catch (error) {
      console.error("Error updating attributes:", error);
    }
  };

  const handleOkColorModal = async () => {
    try {
      const values = await formColorEdit.validateFields();
      const updatedColorOptions = productState.colorOptions.map((color) =>
        color.id === editingColor.colorId
          ? {
              ...color,
              price: values.basePrice,
              discountedPrice: values.discountPrice,
            }
          : color
      );
      productState.colorOptions = updatedColorOptions;
      setProductState(productState);
      setIsColorModalVisible(false);
      formColorEdit.setFieldsValue({
        basePrice: values.basePrice,
        discountPrice: values.discountPrice,
      });
      setEditingColor(null);
    } catch {}
  };

  const handleOkStockModal = async () => {
    try {
      var id;
      if (editingColor !== null) {
        id = editingColor.colorId;
      } else {
        id = colorsData[0].colorId;
      }
     
      const values = await formStockEdit.validateFields();
      const updatedColorOptions = productState.colorOptions.map((color) =>
        color.id === id
          ? {
              ...color,
              stock: color.stock.map((item) =>
                item.size === editingStock.size
                  ? { ...item, stock: values.stock }
                  : item
              ),
            }
          : color
      );
      productState.colorOptions = updatedColorOptions;
      setProductState(productState);
      setIsStockModalVisible(false);
      formStockEdit.resetFields();
      setEditingStock(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleColorEdit = (stock) => {
    setEditingColor(stock);
    setIsColorModalVisible(true);
    formColorEdit.setFieldsValue({
      basePrice: stock.basePrice,
      discountPrice: stock.discountPrice
    });
  };

  const handleStockEdit = (stock) => {
    setEditingStock(stock);
    setIsStockModalVisible(true);
    formStockEdit.setFieldsValue({
      stock: stock.stock
    });
  };

  const handleAttributesEdit = (attributes) => {
    setEditingAttributes(attributes);
    const selectedValues = filtersData
      .find(filter => filter.label.localeCompare(attributes.attributeName, undefined, { sensitivity: 'base' }) === 0)
      ?.items.filter(item => attributes.value.includes(item)) || [];
    formAttribute.setFieldsValue({
      selectedItems: selectedValues,
    });
    setIsAttributesModalVisible(true);
  };

  const handleStatusChange = (newStatus, benefitId) => {
    const updatedBenefits = productState.benefits.map((benefit) =>
      benefit.id === benefitId ? { ...benefit, status: newStatus } : benefit
    );
    setProductState((prevProductState) => ({
      ...prevProductState,
      benefits: updatedBenefits,
    }));
  };

  const brands = filtersData.find((filter) => filter.key === 'brand')?.items || [];
  const color = productState.colorOptions[selectedColorIndex];
  const visibleThumbnails = color.images.slice(startIndex, startIndex + 5);
  const [selectedImage, setSelectedImage] = useState(visibleThumbnails[0]);
  
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, color.images.length - 5));

  const handleColorSelect = (record, index) => {
    setSelectedColorIndex(index);
    setEditingColor(record);
    formAttribute.setFieldsValue({
      basePrice: record.basePrice,
      discountPrice: record.discountPrice,
    });
    setSelectedImage(productState.colorOptions[index].images[0]);
  };

  const attributesData = productDataState.specifications.map((spec, index) => ({
    key: index + 1,
    attributeName: spec.label,
    value: spec.value.join(", "),
  }));

  const colorsData = productState.colorOptions.map((color, index) => ({
    colorId: color.id,
    colorName: color.label,
    images: color.images,
    basePrice: color.price,
    discountPrice: color.discountedPrice,
    status: color.stock > 0 ? 'active' : 'inactive',
  }));

  const attributesColumns = [
    { title: 'ID', dataIndex: 'key', key: 'key' },
    { title: 'Tên thuộc tính', dataIndex: 'attributeName', key: 'attributeName' },
    { title: 'Giá trị', dataIndex: 'value', key: 'value' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleAttributesEdit(record)} />
      ),
    },
  ];

  const colorsColumns = [
    { title: 'ID', dataIndex: 'colorId', key: 'colorId' },
    { title: 'Tên màu', dataIndex: 'colorName', key: 'colorName' },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div>
          {images.map((img, idx) => (
            <Image key={idx} src={img} alt={`Color ${idx + 1}`} width={50} />
          ))}
        </div>
      ),
    },
    { title: 'Giá gốc', dataIndex: 'basePrice', key: 'basePrice' },
    { title: 'Giá giảm', dataIndex: 'discountPrice', key: 'discountPrice' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleColorEdit(record)} />
      ),
    },
  ];

  const stockColumns = [
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Số lượng', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleStockEdit(record)} />
      ),
    },
  ];

  const benefitsData = productState.benefits.map((benefit, index) => ({
    key: index + 1,
    benefitId: benefit.id,
    description: benefit.description,
    status: benefit.status,
  }));
  
  const benefitsColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Mô tả ưu đãi", dataIndex: "description", key: "description" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: "#52c41a" }} onClick={() => handleEditBenefit(record)} />
      ),
    },
  ];

  const handleRemoveImage = (imageUrl) => {
    const updatedImages = editingColor.images.filter((img) => img !== imageUrl);
    const updatedColorOptions = productState.colorOptions.map((color) =>
      color.id === editingColor.colorId
        ? {
            ...color,
            images: updatedImages,
          }
        : color
    );
    setProductState({ ...productState, colorOptions: updatedColorOptions });
  };

  const handleImageUpload = ({ file, onSuccess }) => {
    const newImageUrl = URL.createObjectURL(file);
    const updatedColorOptions = productState.colorOptions.map((color) =>
      color.id === editingColor.colorId
        ? {
            ...color,
            images: [...color.images, newImageUrl],
          }
        : color
    );
    setProductState({ ...productState, colorOptions: updatedColorOptions });
    const updatedImages = [...editingColor.images, newImageUrl];
    setEditingColor((prevColor) => ({
      ...prevColor,
      images: updatedImages,
    }));
    onSuccess();
  };

  const [isAddStockModalVisible, setIsAddStockModalVisible] = useState(false);

  const handleAddStock = () => {
    setIsAddStockModalVisible(true);
  };

  const handleOkAddStockModal = async () => {
    try {
      const values = await formAddStock.validateFields(['sizeNew', 'stockNew']);
      if (!values.sizeNew || values.stockNew === undefined) {
        console.warn("Vui lòng nhập cả size và số lượng");
        return;
      }
      const newStock = { size: values.sizeNew, stock: values.stockNew };
      const updatedColorOptions = productState.colorOptions.map((color, index) =>
        index === selectedColorIndex
          ? { ...color, stock: [...color.stock, newStock] }
          : color
      );
      setProductState({ ...productState, colorOptions: updatedColorOptions });
      setIsAddStockModalVisible(false);
      formAddStock.resetFields();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const initialColor = productState.colorOptions[0];
  const [isAddColorModalVisible, setIsAddColorModalVisible] = useState(false);
  const [tempImages, setTempImages] = useState([]);

  const handleAddColor = () => {
    setIsAddColorModalVisible(true);
  };

  const handleImageUploadAddColor = ({ file, onSuccess }) => {
    const newImageUrl = URL.createObjectURL(file);
    setTempImages([...tempImages, newImageUrl]);
    onSuccess();
  };

  const handleRemoveImageAddColor = (imageUrl) => {
    setTempImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
  };

  const handleOkAddColorModal = async () => {
    try {
      const values = await formAddColor.validateFields();
      const newColor = {
        id: Date.now(),
        label: values.colorName,
        price: values.basePriceNew,
        discountedPrice: values.discountPriceNew,
        images: tempImages,
        stock: [],
      };
      setProductState((prevProductState) => ({
        ...prevProductState,
        colorOptions: [...prevProductState.colorOptions, newColor],
      }));
      setIsAddColorModalVisible(false);
      setTempImages([]);
      formAddColor.resetFields();
    } catch (error) {
      console.error("Error adding color:", error);
    }
  };

  const [isEditBenefitModalVisible, setIsEditBenefitModalVisible] = useState(false);
  const [isAddBenefitModalVisible, setIsAddBenefitModalVisible] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [formEditBenefit] = Form.useForm();
  const [formAddBenefit] = Form.useForm();

  const handleOkEditBenefitModal = async () => {
    try {
      const values = await formEditBenefit.validateFields();
      const updatedBenefits = productState.benefits.map((benefit) =>
        benefit.id === editingBenefit.id
          ? { 
              ...benefit, 
              description: values.description,
              status: values.status
            }
          : benefit
      );
      setProductState((prevState) => ({
        ...prevState,
        benefits: updatedBenefits,
      }));
      formEditBenefit.resetFields();
      setIsEditBenefitModalVisible(false);
      setEditingBenefit(null);
    } catch (error) {
      console.error("Error updating benefit:", error);
    }
  };

  const handleOkAddBenefitModal = async () => {
    try {
      const values = await formAddBenefit.validateFields();
      const newBenefit = {
        id: Date.now(),
        description: values.description,
        status: values.status,
      };
      setProductState((prevState) => ({
        ...prevState,
        benefits: [...prevState.benefits, newBenefit],
      }));
      formAddBenefit.resetFields();
      setIsAddBenefitModalVisible(false);
    } catch (error) {
      console.error("Error adding benefit:", error);
    }
  };

  const handleEditBenefit = (benefit) => {
    setEditingBenefit(benefit);
    formEditBenefit.setFieldsValue({
      description: benefit.description,
      status: benefit.status,
    });
    setIsEditBenefitModalVisible(true);
  };

  const handleAddBenefit = () => {
    formAddBenefit.resetFields();
    setIsAddBenefitModalVisible(true);
  };

  return (
    <Wrapper>
      <Title>Thông tin sản phẩm</Title>
      <Container>
        <LeftSection>
          <ImageBlock>
            <ImageWrapper>
              <Image src={selectedImage} alt="Vợt cầu lông" />
            </ImageWrapper>
            <ThumbnailList>
              {startIndex > 0 && (
                <NavButton onClick={handlePrev}>
                  <LeftOutlined />
                </NavButton>
              )}
              <ThumbnailWrapper>
                {visibleThumbnails.map((img, index) => (
                  <Thumbnail
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    active={selectedImage === img}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </ThumbnailWrapper>
              {startIndex < color.images.length - 5 && (
                <NavButton onClick={handleNext}>
                  <RightOutlined />
                </NavButton>
              )}
            </ThumbnailList>
          </ImageBlock>
        </LeftSection>
        <RightSection>
          <Form form={formAttribute} layout="vertical">
            <Form.Item label="Tên sản phẩm" name="productName" initialValue={productState.name} style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '16px' }}>
              <StyledInput placeholder="Nhập tên sản phẩm" />
            </Form.Item>
            <Form.Item label="Hãng" name="brand" initialValue={productState.brand} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Select>
                {brands.map((brand, index) => (
                  <Option key={index} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '16px' }}>
              <Form.Item
                label="Giá gốc"
                name="basePrice"
                initialValue={initialColor ? initialColor.price : 0}
                style={{ marginBottom: 0 }}
              >
                <InputNumber
                  placeholder="Nhập giá gốc"
                  min={0}
                  style={{ width: '100%' }}
                  readOnly
                  formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Form.Item
                label="Giá giảm"
                name="discountPrice"
                initialValue={initialColor ? initialColor.discountedPrice : 0}
                style={{ marginBottom: 0 }}
              >
                <InputNumber
                  placeholder="Nhập giá giảm"
                  min={0}
                  style={{ width: '100%' }}
                  formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  readOnly
                />
              </Form.Item>
            </Form.Item>
          </Form>
          <Title>Bảng ưu đãi</Title>
          <Button icon={<PlusOutlined />} onClick={handleAddBenefit} style={{ marginBottom: '16px' }}>
            Thêm ưu đãi
          </Button>
          <Table
            dataSource={productState.benefits}
            columns={benefitsColumns}
            rowKey="benefitId"
            pagination={false}
          />
        </RightSection>
      </Container>
      <Container style={{ boxShadow: 'none', border: 'none', padding: '0' }}>
        <TableWrapper>
          <Title>Bảng màu sắc</Title>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddColor}
            style={{ marginBottom: '16px' }}
          >
            Thêm màu sắc
          </Button>
          <Table
            dataSource={colorsData}
            columns={colorsColumns}
            rowKey="id"
            pagination={false}
            onRow={(record, rowIndex) => ({
              onClick: () => handleColorSelect(record, rowIndex),
            })}
          />
        </TableWrapper>
        <TableWrapper style={{ marginLeft: '20px' }}>
          <Title>Bảng tồn kho/size màu {color.label}</Title>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddStock}
            style={{ marginBottom: '16px' }}
          >
            Thêm tồn kho
          </Button>
          <Table
            dataSource={color.stock}
            columns={stockColumns}
            rowKey="size"
            pagination={false}
          />
        </TableWrapper>
      </Container>
      <Container style={{ display: 'block' }}>
        <Title>Bảng thuộc tính</Title>
        <Table
          dataSource={attributesData}
          columns={attributesColumns}
          rowKey="id"
          pagination={false}
          style={{ marginBottom: '20px' }}
        />
      </Container>
      <Container style={{ display: 'block' }}>
        <Title>Thông tin</Title>
        <div style={{ width: '100%', marginTop: '-50px' }}>
          <DecriptionEnterZone />
        </div>
      </Container>

      {/* Color Edit Modal */}
      <Modal
        title="Chỉnh sửa màu sắc"
        visible={isColorModalVisible}
        onOk={handleOkColorModal}
        onCancel={handleCancelColorModal}
      >
        <Form form={formColorEdit}>
          <Form.Item name="basePrice" label="Giá" initialValue={editingColor?.basePrice}>
            <Input />
          </Form.Item>
          <Form.Item name="discountPrice" label="Giá giảm" initialValue={editingColor?.discountPrice}>
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {editingColor?.images?.map((image, index) => (
                <div key={index} style={{ position: 'relative', width: '50px' }}>
                  <Image src={image} alt={`Ảnh ${index + 1}`} width={50} />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveImage(image)}
                    style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                  />
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Upload ảnh mới">
            <Upload
              customRequest={handleImageUpload}
              listType="picture-card"
              showUploadList={false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Stock Edit Modal */}
      <Modal
        title="Chỉnh sửa thông tin kho"
        visible={isStockModalVisible}
        onOk={handleOkStockModal}
        onCancel={handleCancelStockModal}
      >
        <Form form={formStockEdit}>
          <Form.Item name="stock" label="Số lượng" initialValue={editingStock?.stock}>
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Attributes Edit Modal */}
      <Modal
        title="Chỉnh sửa thông số kỹ thuật"
        visible={isAttributesModalVisible}
        onOk={handleOkAttributesModal}
        onCancel={handleCancelAttributesModal}
      >
        <Form form={formAttribute}>
          <Form.Item label="Chọn các giá trị" name="selectedItems">
            <Checkbox.Group>
              {filtersData
                .filter(
                  (filter) =>
                    filter.label.localeCompare(editingAttributes?.attributeName || '', undefined, { sensitivity: 'base' }) === 0
                )
                .map((filter) => (
                  <div key={filter.key}>
                    {filter.items.map((item) => (
                      <Checkbox key={item} value={item}>
                        {item}
                      </Checkbox>
                    ))}
                  </div>
                ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm màu sắc mới"
        visible={isAddColorModalVisible}
        onOk={handleOkAddColorModal}
        onCancel={() => setIsAddColorModalVisible(false)}
      >
        <Form form={formAddColor}>
          <Form.Item name="colorName" label="Chọn màu" rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}>
            <Select>
              {filtersData.find(item => item.key === 'color').items.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="basePriceNew" label="Giá gốc" rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="discountPriceNew" label="Giá giảm">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              customRequest={handleImageUploadAddColor}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<PlusOutlined />}>Tải ảnh lên</Button>
            </Upload>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {tempImages.map((img, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <Image src={img} alt={`Image ${idx + 1}`} width={50} />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveImageAddColor(img)}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Stock Modal */}
      <Modal
        title="Thêm tồn kho mới"
        visible={isAddStockModalVisible}
        onOk={handleOkAddStockModal}
        onCancel={() => setIsAddStockModalVisible(false)}
      >
        <Form form={formAddStock}>
          <Form.Item name="sizeNew" label="Size" rules={[{ required: true, message: 'Vui lòng chọn size' }]}>
            <Select placeholder="Chọn size">
              {filtersData.find((item) => item.key === 'size').items.map((size, index) => (
                <Select.Option key={index} value={size}>{size}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="stockNew" label="Số lượng" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số lượng" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa ưu đãi"
        visible={isEditBenefitModalVisible}
        onOk={handleOkEditBenefitModal}
        onCancel={() => setIsEditBenefitModalVisible(false)}
      >
        <Form form={formEditBenefit} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả ưu đãi"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ưu đãi" }]}
            initialValue={editingBenefit ? editingBenefit.description : ""}
          >
            <Input placeholder="Nhập mô tả ưu đãi" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            initialValue={editingBenefit ? editingBenefit.status : "Hoạt động"}
          >
            <Select>
              <Option value="Hoạt động">Hoạt động</Option>
              <Option value="Không hoạt động">Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm mới ưu đãi"
        visible={isAddBenefitModalVisible}
        onOk={handleOkAddBenefitModal}
        onCancel={() => setIsAddBenefitModalVisible(false)}
      >
        <Form form={formAddBenefit} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả ưu đãi"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ưu đãi" }]}
          >
            <Input placeholder="Nhập mô tả ưu đãi" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Option value="Hoạt động">Hoạt động</Option>
              <Option value="Không hoạt động">Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default AdminProductDetail;
