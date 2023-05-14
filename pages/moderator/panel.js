import Footer from "../component/footer"
import MyLayout from "../component/layout"
import SessionCheck from "../component/sessioncheck"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from "axios";
import ModeratorInfo from "./component/info";
import GetAllReportToProcess from "./component/reports";
import GetAllUsers from "./component/users";
import GetAllSeller from "./component/seller";
import GetAllProduct from "./component/product";
import GetAllCoupons from "./component/coupon";


export default function Panel({ data, data1, data2, data3, data4}) {

    const [showModeratorInfo, setShowModeratorInfo] = useState(false);
    const [showReports, setShowReports] = useState(true);
    const [showUser, setShowUser] = useState(false);
    const [showShop, setshowShop] = useState(false);
    const [showProduct, setshowProduct] = useState(false);
    const [showCoupon, setshowCoupon] = useState(false);
    
    const handleProfileClick = () => {
        setShowModeratorInfo(true);
        setShowReports(false);
        setShowUser(false);
        setshowShop(false);
        setshowProduct(false);
        setshowCoupon(false);
    };      
    
    const handleReportsClick = () => {
        setShowModeratorInfo(false);
        setShowReports(true);
        setShowUser(false);
        setshowShop(false);
        setshowProduct(false);
        setshowCoupon(false);
    };

    const handelUserClick = () => {
      setShowModeratorInfo(false);
      setShowReports(false);
      setShowUser(true);
      setshowShop(false);
      setshowProduct(false);
      setshowCoupon(false);
  };

  const handelShopClick =() => {
      setShowModeratorInfo(false);
      setShowReports(false);
      setShowUser(false);
      setshowShop(true);
      setshowProduct(false);
      setshowCoupon(false);
  }

    const handelProductClick =() => {
      setShowModeratorInfo(false);
      setShowReports(false);
      setShowUser(false);
      setshowShop(false);
      setshowProduct(true);
      setshowCoupon(false);
  }

  const handelCouponClick =() => {
    setShowModeratorInfo(false);
    setShowReports(false);
    setShowUser(false);
    setshowShop(false);
    setshowProduct(false);
    setshowCoupon(true);
}
  
    
    const router = useRouter()
    const [products, setProducts] = useState([]);
    const [username, seUsername] = useState(null);
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstname, seFirstname] = useState(null);
    const [lastname, seLastname] = useState(null);
    const [phone, sePhone] = useState(null);
    const [dob, deDob] = useState(null);
    const [blocked, seBlocked] = useState(null);
    const [id, seId] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined')// checks if the code is running on the client-side and not on the server-side.
        {
            const session = sessionStorage.getItem('username');
            if (session) {
              seUsername(sessionStorage.getItem('username'));
              setFile(sessionStorage.getItem('filename'));
              setEmail(sessionStorage.getItem('email'));
              seFirstname(sessionStorage.getItem('firstname'));
              seLastname(sessionStorage.getItem('lastname'));
              sePhone(sessionStorage.getItem('phone'));
              deDob(sessionStorage.getItem('dob'));
              seBlocked(sessionStorage.getItem('blocked'));
              seId(sessionStorage.getItem('id'));
            }          
        }
    
    }, []);

  return (
    <>
<SessionCheck />
<div >
      <MyLayout title='Moderator' />
</div>

<div style={{ display: 'flex', marginTop:'-40px', flexDirection: 'row' }}>
  <div className="bg-soft-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div style={{ marginLeft: '0px' }} className="w-80 bg-white p-6 border-t-4 border-indigo-600">
      <div className="image overflow-hidden">
        <img className="h-auto w-full mx-auto"
          src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
          alt=""/>
      </div>
      <div className="mt-0 text-center">
            <img src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${file}`} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{firstname} {lastname}</h5>
            <span className="hidden text-gray-500 lg:block">@{username}</span>
            <span className="hidden text-gray-400 lg:block">Moderator</span>
    </div>
      <ul
        style={{marginTop:'10px'}}
      >
        <li>
        <a onClick={handleProfileClick}  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-person" viewBox="0 0 16 16"> <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/> </svg>
            <span className={showModeratorInfo ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Profile</span>
            <button onClick={() => window.location.href='/moderator/changeInfo'} className="bg-indigo-600 py-1 px-2 rounded text-white text-sm font-medium inline-flex items-center justify-center ml-auto">Edit</button>
        </a>
        </li>


        <li>
        <a onClick={handleReportsClick}  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16"> <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/> <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/> </svg>
            <span className={showReports ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Show Reports</span>
        </a>
        </li>

        <li>
        <a onClick={handelUserClick}  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16"> <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/> </svg>
            <span className={showUser ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Manage Users</span>
        </a>
        </li>

        <li>
          <a onClick={handelShopClick} className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16"> <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/> </svg>
            <span className={showShop ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Shop Shops</span>
          </a>
        </li>

        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

        <li>
          <a onClick={handelProductClick} className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/> </svg>
            <span className={showProduct ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Manage Product</span>
          </a>
        </li>

        <li>
          <a onClick={handelCouponClick} className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-heading" viewBox="0 0 16 16"> <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/> <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/> </svg>
            <span className={showCoupon ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Manage Coupons</span>
          </a>
        </li>

      </ul>
    </div>
  </div>
  <div style={{ flex: 1 }}>
    <div style={{marginTop:'20px', marginRight:'15px'}}>
        {showModeratorInfo && <ModeratorInfo firstname={firstname} lastname={lastname} phone={phone} email={email} dob={dob}/>}
        {showReports && <GetAllReportToProcess data={data} />}
        {showUser && <> <GetAllUsers data = {data1}></GetAllUsers></>}
        {showShop && <GetAllSeller data = {data2}></GetAllSeller>}
        {showProduct && <GetAllProduct data = {data3}></GetAllProduct>}
        {showCoupon && <GetAllCoupons data={data4}></GetAllCoupons>}
    </div>
  </div>
</div>
<Footer />


    </>
  )
}

export async function getServerSideProps(context) {
  const response = await axios.get(`http://server-octoo-shop-production.up.railway.app/report/getall`);
  const data = await response.data;
  const response1 = await axios.get(`http://server-octoo-shop-production.up.railway.app/user/getAll`);
  const data1 = await response1.data;
  const response2 = await axios.get(`http://server-octoo-shop-production.up.railway.app/seller/getAll`);
  const data2 = await response2.data;
  const response3 = await axios.get(`http://server-octoo-shop-production.up.railway.app/product/getAll`);
  const data3 = await response3.data;
  const response4 = await axios.get(`http://server-octoo-shop-production.up.railway.app/coupon/getAll`);
  const data4 = await response4.data;
  return { props: { data, data1, data2, data3, data4 } }
}