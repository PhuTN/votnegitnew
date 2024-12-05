import React, {useEffect, useState} from 'react'
import AccountComponent from '../../components/AccountPageC/AccountComponent/AccountComponent'
import { AppContexts } from '../../contexts/AppContexts';
import axios from 'axios';
const AccountPage = () => {

      const userID = localStorage.getItem("id")
      const [userOrders, setUserOrders] = useState([])
      const [userInfo, setUserInfo] = useState([])

      useEffect(() => {
        axios.get(`http://localhost:8081/v1/api/getOrder/` + userID)
        // axios.get("http://localhost:8081/v1/api/getOrder/671cf797038362a49b838a57")
            .then(res => {
              setUserOrders(res.data)
                // let date = new Date(res.data.ngaySinh);
                // let tempMonth
                // if (((parseInt(date.getMonth())) + 1) < 10) {
                //     tempMonth = "0" + (date.getMonth() + 1);
                // }
                // setNgaySinh(date.getFullYear() + "-" + tempMonth + "-" + date.getDate())

            })
            .catch(err => {
                console.log(err)
            })


    }, [userID]);

    useEffect(() => {
      axios.get(`http://localhost:8081/v1/api/getUser/` + userID)
          .then(res => {
            setUserInfo(res.data)
          })
          .catch(err => {
              console.log(err)
          })


  }, [userID]);


  return (
    <div style={{width: '1200px', 
                margin: '30px auto 50px auto', }}>
        <AccountComponent personalInfo={userInfo} orderData={userOrders} />
    </div>
  )
}

export default AccountPage