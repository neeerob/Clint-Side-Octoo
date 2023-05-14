import Footer from "../component/footer"
import MyLayout from "../component/layout"
import SessionCheck from "../component/sessioncheck"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from "axios";


export default function ModeratorDashboard({ data }) {

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
  console.log(data);

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
    <SessionCheck></SessionCheck>
    <div style={{ position: 'fixed', top: -10, width: '100%', zIndex: 1 }}>
    <MyLayout title='Moderator'></MyLayout>
    </div>

    <div style={{marginTop: '125px'}} className="flex flex-wrap justify-center">
            <div className="bg-gray-100">
            <div className="w-full text-white bg-main-color">

            </div>


                <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">

                        <div className="w-full md:w-3/12 md:mx-2">

                            <div className="bg-white p-3 border-t-4 border-indigo-600">
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto"
                                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                        alt=""/>
                                </div>
                                <img
                                    src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${file}`}
                                    className="mx-auto mb-4 w-32 rounded-lg"
                                    alt="Avatar" 
                                    style={{width: "200px", height: "200px"}}
                                    />
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{firstname} {lastname}</h1>
                                <h3 className="text-gray-600 font-lg text-semibold leading-6">Moderator at Company Inc.</h3>
                                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">A trusted moderator</p>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                                className="bg-indigo-600 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li className="flex items-center py-3">
                                        <span>Member since</span>
                                        <span className="ml-auto">Jan 07, 2023</span>
                                    </li>
                                    <li className="flex items-center py-3">
                                        <span>Wallet</span>
                                        <span className="ml-auto">None</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="my-4"></div>
                            <div className="my-4"></div>

                            {/* Here we can show other shops */}

                        </div>

                        <div className="w-full md:w-9/12 mx-2 h-64">

                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Profile Information</span><a href="./changeInfo" className="bg-indigo-600 py-1 px-2 rounded text-white text-sm hover:bg-indigo-500">Edit</a>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2">{firstname}</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2">{lastname}</div>
                                        </div>


                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Catagory</div>
                                            <div className="px-4 py-2">Moderator</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">{phone}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Current Address</div>
                                            <div className="px-4 py-2">Dhaka, Bangladesh</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href={`mailto:${email}`}>{email}</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Birthday</div>
                                            <div className="px-4 py-2">{new Date(dob).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                        </div>
                                    </div>
                                </div>
                                    <button
                                        className="block w-full text-white text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                        Report
                                    </button>
                            </div>




                            <div className="flex flex-wrap justify-center" id="card-container">
                              <div className="md:flex no-wrap md:-mx-2">

                                  <div className="container mx-auto my-5 p-5">
                                      <div>
                                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                              <span clas="text-green-500">
                                                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                      stroke="currentColor">
                                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                  </svg>
                                              </span>
                                              <span className="tracking-wide">Report to process</span>
                                          </div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {data.map(product => (
    <div onClick={() => window.location.href='/home'} key={product.Id} className="bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
      <div className="p-4">
        <a className="flex items-center text-gray-500 md:hover:text-blue-700">
          <img src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.user.filename}`} alt={product.user.Username} className="w-8 h-8 rounded-full mr-2" />
          <div>
            <div className="font-small line-clamp-1">{product.user.Firstname} {product.user.Lastname}</div>
            <div className="text-sm">{new Date(product.Timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
        </a>
        <div className="flex items-center mb-4">
          <p className="mt-5 text-sm text-gray-800 line-clamp-4" title="New York, NY 10004, United States">
            {product.Discription}
          </p>
        </div>
        <hr className="my-4 border-gray-300"/>
        <div className="flex items-center mt-4">
          <div className="text-center text-gray-500 text-xs mb-2">Report to:</div>
        </div>
        <a href={"/shop/"+product.seller.Id} className="flex items-center text-gray-600 md:hover:text-blue-700">
        <img src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`} alt={product.user.Username} className="w-8 h-8 rounded-full mr-2" />
        <div>
          <div className="font-small line-clamp-1 text-xs">{product.seller.Name}</div>
          <div className="text-sm text-xs">{product.seller.Email}</div>
        </div>
      </a>

      </div>
    </div>
  ))}
</div>














                                      </div>
                                  </div>

                              </div>
                            </div>
                            <Footer className="bg-gray-800 text-gray-300 py-4 w-screen"></Footer>
                        </div>
                    </div>
                    
                </div>
                
            </div>


    </div>


<br></br>
    </>
  )
}


export async function getServerSideProps(context) {
  const response = await axios.get(`http://server-octoo-shop-production.up.railway.app/report/getall`);
  const data = await response.data;
  return { props: { data } }
}