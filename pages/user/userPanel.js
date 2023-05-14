import Footer from "../component/footer"
import MyLayout from "../component/layout"
import SessionCheck from "../component/sessioncheck"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from "axios";
import ModeratorInfo from "../moderator/component/info";
import BuyedProduct from "./component/myProducts";
import TransactionComponent from "./component/transactions";
import DepositComponent from "./component/deposit";


export default function Panel({ data, data1 }) {

    const [showModeratorInfo, setShowModeratorInfo] = useState(false);
    const [buyedProduct, setbuyedProduct] = useState(true);
    const [transactions, settransactions] = useState(false);
    const [deposit, setDeposit] = useState(false);

    
    const handleProfileClick = () => {
        setShowModeratorInfo(true);
        setbuyedProduct(false);
        settransactions(false);
        setDeposit(false)
    };      
    
    const handleReportsClick = () => {
        setShowModeratorInfo(false);
        setbuyedProduct(true);
        settransactions(false);
        setDeposit(false)
    };

    const handelTransactionClick = () => {
        setShowModeratorInfo(false);
        setbuyedProduct(false);
        settransactions(true);
        setDeposit(false)
    };

    const handelDepositClick = () => {
        setShowModeratorInfo(false);
        setbuyedProduct(false);
        settransactions(false);
        setDeposit(true)
    };



  
    
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
    const [role, setRole] = useState(null);
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
            const session = sessionStorage.getItem('username');
            if (session) {
                seUsername(session);
                const username = session; // define username here
                axios.get('http://server-octoo-shop-production.up.railway.app/user/search/s/'+username)
                  .then(response1 => {
                    console.log(response1);
                      sessionStorage.setItem('ammount', response1.data.Wallet);
                      setWallet(response1.data.Wallet);
                            seUsername(sessionStorage.getItem('username'));
                            setFile(sessionStorage.getItem('filename'));
                            setEmail(sessionStorage.getItem('email'));
                            seFirstname(sessionStorage.getItem('firstname'));
                            seLastname(sessionStorage.getItem('lastname'));
                            sePhone(sessionStorage.getItem('phone'));
                            deDob(sessionStorage.getItem('dob'));
                            seBlocked(sessionStorage.getItem('blocked'));
                            seId(sessionStorage.getItem('id'));
                            setRole(sessionStorage.getItem('role'));
                            setWallet(sessionStorage.getItem('ammount'));
                  })
                  .catch(error => {
                      console.log(error);
                  });
                // other code
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
    <div style={{ marginLeft: '0px' }} class="w-80 bg-white p-6 border-t-4 border-indigo-600">
      <div class="image overflow-hidden">
        <img class="h-auto w-full mx-auto"
          src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
          alt=""/>
      </div>
      <div class="mt-0 text-center">
            <img src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${file}`} alt="" class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
            <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{firstname} {lastname}</h5>
            <span class="hidden text-gray-500 lg:block">@{username}</span>
            <span className="hidden lg:block text-gray-400 text-xl font-bold">
                {wallet}
            </span>

    </div>
      <ul
        style={{marginTop:'10px'}}
      >
        <li>
        <a onClick={handleProfileClick}  class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person" viewBox="0 0 16 16"> <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/> <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/> </svg>
            <span className={showModeratorInfo ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Profile</span>
            <button onClick={() => window.location.href='/moderator/changeInfo'} class="bg-indigo-600 py-1 px-2 rounded text-white text-sm font-medium inline-flex items-center justify-center ml-auto">Edit</button>
        </a>
        </li>


        <li>
        <a onClick={handleReportsClick}  class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16"> <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/> <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/> </svg>
            <span className={buyedProduct ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Bought Product</span>
        </a>
        </li>

        <li>
        <a onClick={handelTransactionClick}  class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16"> <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/> <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/> </svg>
            <span className={transactions ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Transactions</span>
        </a>
        </li>

        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>


        <li>
          <a onClick={handelDepositClick} class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16"> <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/> <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/> </svg>
            <span className={deposit ? "text-indigo-500 ml-3" : "ml-3 text-gray-500"}>Withdraw/Deposit</span>
          </a>
        </li>


      </ul>
    </div>
  </div>
  <div style={{ flex: 1 }}>
    <div style={{marginTop:'20px', marginRight:'15px'}}>
        {showModeratorInfo && <ModeratorInfo firstname={firstname} lastname={lastname} phone={phone} email={email} dob={dob}/>}
        {buyedProduct && <BuyedProduct data = {data}></BuyedProduct>}
        {transactions && <TransactionComponent data = {data1}></TransactionComponent>}
        {deposit && <DepositComponent></DepositComponent>}
    </div>
  </div>
</div>
<Footer />


    </>
  )
}

export async function getServerSideProps(context) {
  const response = await axios.get(`http://server-octoo-shop-production.up.railway.app/checkout/getall`);
  const data = await response.data;
  const response1 = await axios.get(`http://server-octoo-shop-production.up.railway.app/transaction/getall`);
  const data1 = await response1.data;
  return { props: { data, data1 } }
}