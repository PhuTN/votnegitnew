import { Selector } from 'testcafe';
import{ customer2} from '../utilities/createRole'


fixture `Người dùng cập nhật thông tin cá nhân`;

const editButton = Selector('button').withText('SỬA THÔNG TIN CÁ NHÂN');



// test('[UpdateUserInfomation-] Xác minh người dùng có cập nhật thông tin thành công với thông tin chính xác không ', async t => {

//     await t
//         .useRole(customer2)
//         //B1
//         .navigateTo('http://localhost:3000/account') 
//         .click(Selector('table').find('tr').withText('O63308'))
//         .click(Selector('[data-testid="huy"]'))
//         .typeText(Selector('[data-testid="liDo"]'), 'Hết tiền rồi', { replace: true })
//         .click(Selector('[data-testid="ok"]'))
//         .expect(Selector('.ant-message').withText("Hủy thành công!").exists).ok();
// })

test('[UpdateUserInfomation-] Xác minh người dùng có cập nhật thông tin thành công với thông tin chính xác không ', async t => {

    await t
        .useRole(customer2)
        //B1
        .navigateTo('http://localhost:3000/account') 
        .click(Selector('table').find('tr').withText('O59011'))
        .click(Selector('[data-testid="huy"]'))
        .typeText(Selector('[data-testid="liDo"]'), 'Hết tiền rồi', { replace: true })
        .click(Selector('[data-testid="ok"]'))
        .expect(Selector('.ant-message').withText("Hủy thành công!").exists).ok();
})