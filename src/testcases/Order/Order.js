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
//     await t.click(Selector('[data-testid="dathang"]'))
//     await t.typeText(Selector('[data-testid="ghichu"]'), 'Giao nhanh', { replace: true })
//     await t.click(Selector('[data-testid="shipcod"]'))
//     await t.click(Selector('[data-testid="dat"]'))
//     .expect(Selector('.ant-message').withText("Đặt hàng thành công!").exists).ok();
    

// });

test('[ViewProduct-] Test chức năng xóa sản phẩm khỏi giỏ hàng', async t => {
    await t.useRole(customer2)
    .navigateTo('http://localhost:3000')
    await t.wait(3000)
    await t.click(Selector('[data-testid="cartPageBtn"]'))
    await t.click(Selector('[data-testid="dathang"]'))
    await t.typeText(Selector('[data-testid="ghichu"]'), 'Giao nhanh', { replace: true })
    await t.click(Selector('[data-testid="chuyenkhoan"]'))
    await t.click(Selector('[data-testid="dat"]'))
    .expect(Selector('.ant-message').withText("Đặt hàng thành công!").exists).ok();
    

});

