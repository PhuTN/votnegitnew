import { Selector } from 'testcafe';
import{admin} from '../utilities/createRole'
fixture('Test chức năng nhân viên bán hàng hoặc Admin xác nhận đơn hàng')


test('[ConfirmOrder-] Xác nhận dơn hàng có id O55616', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Đơn hàng');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .click(Selector('[data-testid="O55616"]'))
        .click(Selector('[data-testid="xacNhan"]'))
    await t.expect(Selector('.ant-message').withText('Cập nhật trạng thái đơn hàng thành công').exists).ok();

    await t
    .click(Selector('[data-testid="luu"]'))

    await t.expect(Selector('.ant-message').withText('Lưu thành công!').exists).ok();

});

test('[ConfirmOrder-1] Xác nhận dơn hàng có id O59011', async t => {
    const menuItem = Selector('.ant-menu-item').withText('Đơn hàng');
    await t
        .useRole(admin)
        //B1
        .navigateTo('http://localhost:3000/admin') 
        .click(menuItem)
        .click(Selector('[data-testid="O59011"]'))
        .click(Selector('[data-testid="xacNhan"]'))
    await t.expect(Selector('.ant-message').withText('Cập nhật trạng thái đơn hàng thành công').exists).ok();

    await t
    .click(Selector('[data-testid="luu"]'))

    await t.expect(Selector('.ant-message').withText('Lưu thành công!').exists).ok();

});