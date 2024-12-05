
import AccountInfoPage from "../pages/AccountInfoPage/AccountInfoPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SigninPage from "../pages/SigninPage/SigninPage";
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/product',
        page:ProductPage,
        isShowHeader: true
    },
    {
        path: '/product/product-detail/:productName',
        page:ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/cart',
        page:CartPage,
        isShowHeader: true
    },
    {
        path: '/account',
        page: AccountPage,
        isShowHeader: true
    },
    {
        path: '/login',
        page: LoginPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SigninPage,
        isShowHeader: true
    },
    {
        path: '/account/account-info',
        page: AccountInfoPage,
        isShowHeader: true
    },
    {
        path: '/order-detail/:orderID',
        page: OrderDetailPage,
        isShowHeader: true
    },
    
    {
        path: '/order-detail/payment',
        page: PaymentPage,
        isShowHeader: false
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: false
    },
    {
        path: '*',
        page: NotFoundPage
    }
]