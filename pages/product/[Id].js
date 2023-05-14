import { useRouter } from "next/router";
import Footer from "../component/footer";
import MyLayout from "../component/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from 'react';


function Product({ data }) {

  console.log(data);
  const [selectedReport, setSelectedReport] = useState(null);
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false);
  const [role, setRole] = useState(null);
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [username, seUsername] = useState(null);

  const handleClosePopup = () => {
    setSelectedReport(null);
  };
  
  const handleToggleMode = (product) => {
    setRole(sessionStorage.getItem('role'));
    setSelectedReport(product);
    setShowPopup(true);
  };

  const withCoupon = (product) => {
    setError(null);
    if (inputRef.current.value) {
      const value = inputRef.current.value;
      if (Number.isInteger(parseInt(value))) {

        const axios = require('axios');
  
        axios.post(`http://server-octoo-shop-production.up.railway.app/product/buyUsingCoupon/${product.Id}`, {
          username: username,
          coupon:  inputRef.current.value
        })
          .then((response) => {
            console.log(response.data);
            if(response.data.SellerUsername){
              setError(null);
              setOk('Successfully bought the product.');
              window.location.reload();
            }
            else{
              setError(response.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
  
      } else {
        setError('Coupon code only can be intiger type!');
      }
    } else {
      setError('Please enter something in coupon code to buy with coupon!');
    }
  };

  useEffect(() => {
    const session = sessionStorage.getItem('username');
    if (session) {
      seUsername(sessionStorage.getItem('username'));
    }
}, []);


  const withoutCoupon = (product) => {
    setError(null);
    if (product.Id) {

      const axios = require('axios');

      axios.post(`http://server-octoo-shop-production.up.railway.app/product/buy/${product.Id}`, {
        username: username // replace with your actual username value
      })
        .then((response) => {
          console.log(response.data);
          if(response.data.SellerUsername){
            setError(null);
            setOk('Successfully bought the product.');
            window.location.reload();
          }
          else{
            setError(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      setError('Something went wrong!');
    }
  };


  const CardDescription = ({ product, onClose }) => (
    <div style={{ zIndex:'1'}} className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden shadow-lg relative">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-6">


        <a href={"/product/"+product.Id} className="flex items-center text-gray-500 md:hover:text-blue-700">
            <img
                src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.filename}`}
                className="w-20 h-20 rounded-full mr-2"
            />
            <div>
                <div className="font-small line-clamp-1">
                    {product.ProductName}
                    <li class="flex items-center font-bold text-gray-600">

                    <a class="text-gray-900">{product.Price.toLocaleString()} BDT</a>
                </li>
                </div>
            </div>
        </a>


        <div class="mt-4 flex items-center justify-between mb-4 space-x-12">
        {product.SelledQuantity == product.Quantity ? (
            <span class="flex items-center px-2 text-xs font-semibold text-red-400 bg-white border border-red-400 rounded-md">
            
            Out of stock
            </span>
            
        ) : (
            <span class="flex items-center px-2 text-xs font-semibold text-green-500 bg-white border border-green-500 rounded-md">
            Available
            </span>
        )}
        </div>
        <p class="mt-4 text-sm text-gray-800 line-clamp-2" title="New York, NY 10004, United States">
                            {product.Discription}
                        </p>
                        <div className="flex items-center justify-between mt-2">
            <div className="mt-4">
              <p className="font-bold text-gray-600">Seller info:</p>
              
                    <ul class="mt-2 text-sm space-y-1">
                        <li class="flex items-center">
                        <a href={"/shop/"+product.seller.Id} className="flex items-center text-gray-500 md:hover:text-blue-700">
                        <img
                            src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`}
                            className="w-12 h-12 rounded-full mr-2"
                        />
                        <div>
                            <div className="font-small line-clamp-1">
                                {product.seller.Name} 
                            </div>
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                @{product.seller.Username}
                            </p>
                        </div>
                    </a>
                        </li>
                    <li class="flex items-center">
                    <svg class="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    <a href="mailto:${product.Email}" class="text-gray-900 hover:text-blue-700">{product.seller.Email}</a>
                    </li>

                    <li class="flex items-center">
                        <svg class="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <a href="tel:${product.Phone}" class="text-gray-900 hover:text-blue-700">{product.seller.Phone}</a>
                    </li>


                </ul>
            </div>
            <div>
            <p className="font-bold text-gray-600">Launch date:</p>
                  <div className="text-sm">
                    {new Date(product.PublishedDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
            </div>
          </div>

        {role == 'user' ? (
          <>

            <div class="p-6 text-center">
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">How do you want to buy this product?</h3>

                        <input
                            ref={inputRef}
                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter coupon code"
                        />

{error && <p className="mt-4 text-red-500">{error}</p>}
{ok && <p className="mt-4 text-green-500">{ok}</p>}



              <button onClick={() => withCoupon(product)} type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  With coupon
              </button>

              <button onClick={() => withoutCoupon(product)} type="button" class="ml-7 mt-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Without coupon
              </button>


            </div>
          </>
          ) : (
            <>
            <div class="p-6 text-center">
              <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 class="mb-5 text-lg font-normal">
                  Please <a href="../login" class="text-purple-500 hover:text-purple-700">log in</a> to purchase this product.
              </h3>

            </div>
            </>
            )}
          
        </div>
      </div>
    </div>
  );


  return (
      <>
        <div>
        <div style={{ position: 'fixed', top: -10, width: '100%', zIndex:'1'}}>
          <MyLayout title='Home'/>
          </div>

          <section  style={{marginTop: '105px'}} class="text-gray-700 body-font overflow-hidden bg-white">
            <div class="container mx-auto">
              <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 transition-transform duration-500 transform ease-in-out hover:scale-110" style={{width: "100", height: "100"}} src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${data.filename}`}/>
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <a href={"../shop/"+data.Id} class="ease-in-out transition-transform transform md:hover:text-blue-700 hover:-translate-y-1 w-full text-center my-2 flex items-center space-x-4">
                            <img class="w-20 h-20 rounded-full" src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${data.seller.filename}`}alt=""/>
                            <div class="font-medium dark:text-white">
                                <div data-popover-target="popover-user-profile" className='md:hover:text-blue-700'>{data.seller.Name}</div>
                            </div>
                        </a>
                  <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{data.ProductName}</h1>
                  
                  <div class="mt-4 flex justify-between items-center">
                    <div>
                      <p class="text-base font-medium text-gray-700">Total Products</p>
                      <p class="text-3xl font-bold text-green-500">{data.Quantity}</p>
                    </div>
                    <div>
                      <p class="text-base font-medium text-gray-700">Sold Products</p>
                      <p class="text-3xl font-bold text-red-500">{data.SelledQuantity}</p>
                    </div>
                  </div>


                  <div class="mt-4 flex items-center justify-between mb-4 space-x-12">
                  {data.SelledQuantity == data.Quantity ? (
                      <span class="flex items-center px-2 text-xs font-semibold text-red-400 bg-white border border-red-400 rounded-md">
                      
                      Out of stock
                      </span>
                      
                  ) : (
                      <span class="flex items-center px-2 text-xs font-semibold text-green-500 bg-white border border-green-500 rounded-md">
                      Available
                      </span>
                  )}
                  </div>
                  <div class="flex mb-4">
                    <span class="flex items-center">
                      <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <span class="text-gray-600 ml-3">{data.seller.TotalReviewer} Reviews</span>
                    </span>
                    <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                      <a class="text-gray-500">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                      <a class="ml-2 text-gray-500">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a class="ml-2 text-gray-500">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                  <p  class="justify-stretch leading-relaxed">{data.Discription}{data.Discription}</p>
                  <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

                  </div>
                  <div class="flex">
                    <span class="title-font font-medium text-2xl text-gray-900">{data.Price.toLocaleString()} &#2547;</span>
                    <button onClick={() => handleToggleMode(data)} class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy</button>
                  </div>
                </div>
              </div>
            </div>
            </section>

            {selectedReport && (
      <CardDescription
        product={selectedReport}
        onClose={handleClosePopup}
      />
    )}


        </div>
        <br></br>
        <Footer/>
      </>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.Id;
  const response = await axios.get(`http://server-octoo-shop-production.up.railway.app/product/search/${id}`);
  const data = await response.data;
  return { props: { data } }
}

export default Product
