import { Selector } from 'testcafe';
import{ customer2} from '../utilities/createRole'


fixture `Test khách hàng xem chi tiết đơn hàng mình đã đặt`;

const editButton = Selector('button').withText('SỬA THÔNG TIN CÁ NHÂN');



test('[UpdateUserInfomation-] Xem chi tiết đơn hàng có id O63308', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O63308'))
     
})

test('[UpdateUserInfomation-] Xác minh người dùng có cập nhật thông tin thành công với thông tin chính xác không ', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O59011'))
        
})