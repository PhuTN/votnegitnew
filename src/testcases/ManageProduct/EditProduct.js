import { Selector } from 'testcafe';
import{warehouseStaff,admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên kho hoặc admin sửa sản phẩm')


test('[ManageProduct-5] Kiểm tra chức năng đổi tên sản phẩm ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    await t
    .typeText(Selector('[data-testid="tensanpham"]'), 'Vợt test nè',{ replace: true })
    
    const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
    await t.click(saveBtn)
    .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();


    
});

test('[ManageProduct-6] Kiểm tra chức năng thêm ưu đãi ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    const addEndowBtn = Selector('[data-testid="themuudai"]'); // Chọn "Vợt" dựa trên testid
    await t.click(addEndowBtn)
    .typeText(Selector('[data-testid="inputuudai"]'), 'Một tặng một',{ replace: true })
const okEndow = Selector('[data-testid="okuudai"]'); // Chọn "Vợt" dựa trên testid
    await t.click(okEndow)
    .expect(Selector('.ant-message').withText("Thêm ưu đãi thành công!").exists).ok();
const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
    await t.click(saveBtn)
    .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();

    


    
});

test('[ManageProduct-7] Kiểm tra chức năng chỉnh sửa ưu đãi ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    const editEndowBtn = Selector('[data-testid="ongbf0sse"]'); // Chọn "Vợt" dựa trên testid
     await t.click(editEndowBtn)
     .typeText(Selector('[data-testid="inputuudai"]'), 'Ưu đãi sửa',{ replace: true })
     const okEndow = Selector('[data-testid="okuudai"]'); // Chọn "Vợt" dựa trên testid
        await t.click(okEndow)
        .expect(Selector('.ant-message').withText("Chỉnh sửa ưu đãi thành công!").exists).ok();
     const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();
});



        
        test('[ManageProduct-8] Kiểm tra chức năng vô hiệu hóa sửa ưu đãi ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    const editEndowBtn = Selector('[data-testid="ongbf0sse"]'); // Chọn "Vợt" dựa trên testid
     await t.click(editEndowBtn)


     const selectElement = Selector('[data-testid="selectuudai"]');
const optionActive = Selector('[data-testid="activeuudai"]');
const optionInactive = Selector('[data-testid="unactivetuudai"]');


  
    
    await t
        .click(selectElement)
        .click(optionInactive)
         const okEndow = Selector('[data-testid="okuudai"]'); // Chọn "Vợt" dựa trên testid
        await t.click(okEndow)
        .expect(Selector('.ant-message').withText("Chỉnh sửa ưu đãi thành công!").exists).ok();
     const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();
        
        
});


test('[ManageProduct-9] Kiểm tra chức năng thêm màu sắc mới ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    const addEndowBtn = Selector('[data-testid="themmaubtn"]'); // Chọn "Vợt" dựa trên testid
    await t.click(addEndowBtn)


    const uploadInput = Selector('input[type="file"]');
    const uploadedImageContainer = Selector('.ant-upload-list-item'); // Container hiển thị ảnh sau khi upload

    // Mở modal
    await t
    
     

    // Đường dẫn tới file ảnh test
    const filePath = 'C:/Users/PHU/Downloads/checkin.jpg'; // Đảm bảo file này có trong thư mục test

    // Upload ảnh
    await t
    .typeText(Selector('[data-testid="inputmau"]'), 'Tím than',{ replace: true })
    .typeText(Selector('[data-testid="inputgoc"]'), '100000',{ replace: true })
    .typeText(Selector('[data-testid="inputgiam"]'), '99999',{ replace: true })
        .setFilesToUpload(uploadInput, filePath)
        
    

    

         const okEndow = Selector('[data-testid="okmau"]'); // Chọn "Vợt" dựa trên testid
        await t.click(okEndow)
        .expect(Selector('.ant-message').withText("Thêm màu mới thành công!").exists).ok();
     const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();

    
});


test('[ManageProduct-10] Kiểm tra chức năng sửa màu sắc ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    const addEndowBtn = Selector('[data-testid="835xubuls"]'); // Chọn "Vợt" dựa trên testid
    await t.click(addEndowBtn)


    const uploadInput = Selector('input[type="file"]');
    const uploadedImageContainer = Selector('.ant-upload-list-item'); // Container hiển thị ảnh sau khi upload

    // Mở modal
    await t
    
     

    // Đường dẫn tới file ảnh test
    const filePath = 'C:/Users/PHU/Downloads/checkin.jpg'; // Đảm bảo file này có trong thư mục test

    // Upload ảnh
    await t
    //.typeText(Selector('[data-testid="inputmau"]'), 'Tím đen',{ replace: true })
    .typeText(Selector('[data-testid="inputgoc"]'), '800000',{ replace: true })
    .typeText(Selector('[data-testid="inputgiam"]'), '9999',{ replace: true })
        .setFilesToUpload(uploadInput, filePath)
        
    

    

         const okEndow = Selector('[data-testid="okmau"]'); // Chọn "Vợt" dựa trên testid
        await t.click(okEndow)
        .expect(Selector('.ant-message').withText('Sửa màu sắc thành công!').exists).ok();
     const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();

    
});


test('[ManageProduct-11] Kiểm tra chức năng điều chỉnh tồn kho/size của màu sắc ', async t => {

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   

    const colorRow = Selector('table').find('tr').withText('835xubuls');

await t
    .click(colorRow, { offsetX: 10, offsetY: 10 }) 
    .click(Selector('[data-testid="2U: 90 - 94 g"]'))
    .typeText(Selector('[data-testid="numkho"]'), '5', { replace: true })
    .click(Selector('[data-testid="okkho"]'))
    .expect(Selector('.ant-message').withText("Sửa tồn kho thành công!").exists).ok();
         const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();
    
});

test('[ManageProduct-12] Kiểm tra chức năng chỉnh sửa giá trị thuộc tính sản phẩm ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product);
   
    await t
    .click(Selector('[data-testid="AV006"]'))
    .click(Selector('[data-testid="4U: 80 - 84 g"]'))
    .click(Selector('[data-testid="5U: 75 - 79 g"]'))
    .click(Selector('[data-testid="ok"]'))
             const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();
    
});

test('[ManageProduct-13] Kiểm tra chức năng sửa mô tả sản phẩm ', async t => {
  

    await t
        .useRole(warehouseStaff)
        //B1
        .navigateTo('http://localhost:3000/admin') ;


        
    const categoryMenu = Selector('[data-testid="menu-products2"]'); // Chọn menu "Sản phẩm" dựa trên testid
    await t.click(categoryMenu);

    // Chọn "Vợt" từ các mục con
    const categoryItem = Selector('[data-testid="menu-votp2"]'); // Chọn "Vợt" dựa trên testid
    await t.click(categoryItem);

    const product = Selector('[data-testid="kxzihpdqb"]'); // Chọn "Vợt" dựa trên testid
    await t.click(product)
    .typeText(Selector('[data-testid="des"]'), 'Vợt tốt nhất thế giới', { replace: true })
   
    
             const saveBtn = Selector('[data-testid="nutluu"]'); // Chọn "Vợt" dựa trên testid
        await t.click(saveBtn)
        .expect(Selector('.ant-message').withText("Lưu thành công!").exists).ok();
    
});







