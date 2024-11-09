import React from 'react'
import OrderDetailComponent from '../../components/OrderDetailPageC/OrderDetailComponent/OrderDetailComponent';

const OrderDetailPage = () => {
    const data = [
        {
          key: '1',
          orderNumber: 'DH001',
          date: '2024-10-01',
          address: '123 Đường ABC, Quận XYZ',
          price: '500.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '2',
          orderNumber: 'DH002',
          date: '2024-10-02',
          address: '456 Đường DEF, Quận ABC',
          price: '300.000 VNĐ',
          status: 'Đã giao',
        },
        {
          key: '3',
          orderNumber: 'DH003',
          date: '2024-10-03',
          address: '789 Đường GHI, Quận DEF',
          price: '400.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '4',
          orderNumber: 'DH004',
          date: '2024-10-04',
          address: '321 Đường JKL, Quận GHI',
          price: '600.000 VNĐ',
          status: 'Hoàn thành',
        },
        {
          key: '5',
          orderNumber: 'DH005',
          date: '2024-10-05',
          address: '654 Đường MNO, Quận JKL',
          price: '250.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '6',
          orderNumber: 'DH006',
          date: '2024-10-06',
          address: '987 Đường PQR, Quận MNO',
          price: '700.000 VNĐ',
          status: 'Đã giao',
        },
        {
          key: '7',
          orderNumber: 'DH007',
          date: '2024-10-07',
          address: '135 Đường STU, Quận PQR',
          price: '350.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '8',
          orderNumber: 'DH008',
          date: '2024-10-08',
          address: '246 Đường VWX, Quận STU',
          price: '450.000 VNĐ',
          status: 'Hoàn thành',
        },
        {
          key: '9',
          orderNumber: 'DH009',
          date: '2024-10-09',
          address: '369 Đường YZA, Quận VWX',
          price: '800.000 VNĐ',
          status: 'Đang xử lý',
        },
        {
          key: '10',
          orderNumber: 'DH010',
          date: '2024-10-10',
          address: '159 Đường BCD, Quận YZA',
          price: '900.000 VNĐ',
          status: 'Đã giao',
        },
      ];

      const personalInfo = {
        orderId: 'DH123456',
        fullName: 'Nguyễn Văn A',
        phoneNumber: '0123456789',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        status: 'Đang xử lý'
      };
      
  return (
    <div style={{width: '1200px', 
                margin: '30px auto 50px auto', }}>
        /<OrderDetailComponent personalInfo={personalInfo} orderData={data} />
    </div>
  )
}

export default OrderDetailPage