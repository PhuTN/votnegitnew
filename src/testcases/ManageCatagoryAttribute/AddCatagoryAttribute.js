import { Selector } from 'testcafe';
import{warehouseStaff,admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin thêm thuộc tính của loại sản phẩm')


test('[ManageCatagoryAttribute-] Tạo thuộc tính loại sản phẩm vợt thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    await t
    .click(Selector('button').withText('Thêm Thuộc tính'))
    .typeText(Selector('[data-testid="attribute"]'), 'Thuộc tính hợp lệ')
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});



test('[ManageCatagoryAttribute-1] Tạo thuộc tính loại sản phẩm giày thành công ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-giayp"]'); // Chọn "Giày" dựa trên testid
    await t.click(categoryItem);
    
    await t
    .click(Selector('button').withText('Thêm Thuộc tính'))
    .typeText(Selector('[data-testid="attribute"]'), 'Thuộc tính hợp lệ')
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .click(Selector('button').withText('Lưu'))
    .expect(Selector('.ant-message').withText("Lưu thành công.").exists).ok();
});


test('[ManageCatagoryAttribute-2] Tên thuộc tính không được ít hơn 3 kí tự ', async t => {
  

    await t
        .useRole(warehouseStaff)
        
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    await t
    .click(Selector('button').withText('Thêm Thuộc tính'))
    .typeText(Selector('[data-testid="attribute"]'), 'T')
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính phải có ít nhất 3 ký tự.").exists).ok();
});






test('[ManageCatagoryAttribute-3] Tên thuộc tính không được lớn hơn 50 kí tự ', async t => {
  

    await t
        .useRole(warehouseStaff)
        
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    await t
    .click(Selector('button').withText('Thêm Thuộc tính'))
    .typeText(Selector('[data-testid="attribute"]'), 'Đây là một đoạn văn bản có đúng năm mươi mốt ký tự.')
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính không được vượt quá 50 ký tự.").exists).ok();
});

test('[ManageCatagoryAttribute-4] Tên thuộc tính không được trùng ', async t => {
  

    await t
        .useRole(warehouseStaff)
        
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);
    
    await t
    .click(Selector('button').withText('Thêm Thuộc tính'))
    .typeText(Selector('[data-testid="attribute"]'), 'Size')
    .click(Selector('[data-testid="modal-ok-button"]').withText('OK'))
    .expect(Selector('div').withText("Tên thuộc tính đã bị trùng.").exists).ok();
});


