import { jwtDecode } from 'jwt-decode';
import { Selector } from 'testcafe';
import{customer2} from "../utilities/createRole"
// URL của trang đăng nhập



fixture('Test chức năng điều chỉnh giỏ hàng ')

// test('[ViewProduct-] Test chức năng xóa sản phẩm khỏi giỏ hàng', async t => {
//     await t.useRole(customer2)
//     .navigateTo('http://localhost:3000')
//     await t.wait(3000)
//     await t.click(Selector('[data-testid="cartPageBtn"]'))
//     await t.click(Selector('[data-testid="delete 0"]'))
    

// });


test('[ViewProduct-] Test chức năng điều chỉnh số lượng của mỗi sản phẩm trong giỏ hàng', async t => {
    await t.useRole(customer2)
    .navigateTo('http://localhost:3000')
    await t.wait(3000)
    await t.click(Selector('[data-testid="cartPageBtn"]'))
    await t.typeText(Selector('[data-testid="num 0"]'), '9', { replace: true })
    

});