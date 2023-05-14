import { useRouter } from "next/router";
import Footer from "../component/footer";
import MyLayout from "../component/layout";
import axios from "axios";
import React, { useState, useEffect } from 'react';


function Seller({ data, data1 }) {
    console.log(data1);
    console.log(data);
  const router = useRouter()
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://server-octoo-shop-production.up.railway.app/seller/getAll')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
           
  }, []);
  

  return (
      <>
        <div>
        <div style={{ position: 'fixed', top: -10, width: '100%', zIndex: 1 }}>
          <MyLayout title='Home'/>
          </div>
          <div style={{marginTop: '125px'}}>
            <div class="bg-gray-100">
            <div class="w-full text-white bg-main-color">

            </div>


                <div class="container mx-auto my-5 p-5">
                    <div class="md:flex no-wrap md:-mx-2 ">

                        <div class="w-full md:w-3/12 md:mx-2">

                            <div class="bg-white p-3 border-t-4 border-indigo-600">
                                <div class="image overflow-hidden">
                                    <img class="h-auto w-full mx-auto"
                                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                        alt=""/>
                                </div>
                                <img
                                    src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${data.filename}`}
                                    class="mx-auto mb-4 w-32 rounded-lg"
                                    alt="Avatar" 
                                    style={{width: "200px", height: "200px"}}
                                    />
                                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{data.Name}</h1>
                                <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">A trusted shop</p>
                                <ul
                                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        <span class="ml-auto"><span
                                                class="bg-indigo-600 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member since</span>
                                        <span class="ml-auto">Jan 07, 2023</span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Wallet</span>
                                        <span class="ml-auto">{data.Wallet?.toLocaleString()} &#2547;</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="my-4"></div>

                            {/* Here we can show other shops */}
                            <div class="bg-white p-3 hover:shadow">
                                <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span class="text-green-500">
                                        <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </span>
                                <span>Similar Profiles</span>

                                </div>
                                <div class="grid grid-cols-3 gap-2">
                                    
                                    {products.map((seller) => (
                                        <a href={"/shop/"+seller.Id} class="ease-in-out transition-transform transform hover:-translate-y-2 w-full text-center my-2">
                                            <img class="h-16 w-16 rounded-full mx-auto"
                                                src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${seller.filename}`}
                                                alt=""/>
                                            <a href="#" class="text-main-color text-sm">{seller.Name}</a>
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div class="w-full md:w-9/12 mx-2 h-64">

                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span class="tracking-wide">About</span>
                                </div>
                                <div class="text-gray-700">
                                    <div class="grid md:grid-cols-2 text-sm">
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">First Name</div>
                                            <div class="px-4 py-2">{data.Name}</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Catagory</div>
                                            <div class="px-4 py-2">Shop</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                                            <div class="px-4 py-2">{data.Phone}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Current Address</div>
                                            <div class="px-4 py-2">Dhaka, Bangladesh</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Email.</div>
                                            <div class="px-4 py-2">
                                                <a class="text-blue-800" href={`mailto:${data.Email}`}>{data.Email}</a>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Birthday</div>
                                            <div class="px-4 py-2">Jan 06, 1998</div>
                                        </div>
                                    </div>
                                </div>
                                    <button
                                        class="block w-full text-white text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                        Report
                                    </button>
                            </div>


                            <div class="my-4"></div>


                            <div class="bg-white p-3 shadow-sm rounded-sm">

                            <span class="tracking-wide">Experience</span>

                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
            
            

                            {data1.filter(product => product.seller.Id === data.Id).map(product => (
                <div key={product.Id}>
                <div class="relative mx-auto w-full ">
                    <dev class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div class="shadow p-4 rounded-lg bg-white">
                        <div class="flex justify-center relative rounded-lg overflow-hidden h-70 object-fill">
                        <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 ">
                                <img class=" rounded max-w-full align-middle border-none"
                                    src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.filename}`}
                                    alt={product.ProductName}
                                    style={{width: "250px", height: "250px"}}
                                />
                        </div>

                            <div class="absolute flex justify-center bottom-0 mb-3">
                                
                            </div>

                            <span class="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                                New
                            </span>
                        </div>

                        <div class="mt-4">
                        <a href={"/product/"+product.Id} class="font-medium text-base md:text-lg text-gray-800 line-clamp-1 hover:text-blue-500" title="New York">
                            {product.ProductName}
                        </a>

                        
                        </div>
                        <div class="flex item-center justify-between mt-3">
                        <h1 class="text-1.5xl font-bold text-gray-900">{product.Price.toLocaleString()} &#2547;</h1>
                            <button class="px-2 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to Card</button>
                        </div>
                        <div class="ml-2 mt-3 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            {product.SelledQuantity} Sold  &bull; {product.Quantity - product.SelledQuantity} Available
                        </div>
                        <p class="mt-4 text-sm text-gray-800 line-clamp-2" title="New York, NY 10004, United States">
                            {product.Discription}
                        </p>

                        <div class="grid grid-cols-2 grid-rows-2 gap-1 mt-2">
                        <p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                            <svg class="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z"></path></svg>
                            <span class="text-gray-600 text-sm">
                            <span class="text-gray-600 text-sm">{Math.round((new Date() - new Date(product.PublishedDate)) / (1000 * 60 * 60 * 24))} days ago</span>
                            </span>
                        </p>
                        <dev class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                        <div className="flex items-center mt-0">
                            <div className="mr-2">
                                <span className="text-yellow-500">
                                {[...Array(product.seller.Star)].map((star, i) => (
                                    <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 fill-current"
                                    viewBox="0 0 20 20"
                                    >
                                    <path
                                        d="M9.357 1.213l2.76 5.613 6.187.898c.76.11 1.062 1.045.518 1.567l-4.482 4.358 1.05 6.13c.16.93-.8 1.637-1.59 1.17L10 16.107l-5.518 2.874c-.79.41-1.75-.24-1.59-1.17l1.05-6.13L.14 8.69c-.54-.52-.242-1.457.518-1.567l6.187-.898 2.76-5.613c.4-.817 1.51-.817 1.91 0z"
                                    />
                                    </svg>
                                ))}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600 text-sm">
                                {product.seller.TotalReviewer} reviews
                                </span>
                            </div>
                            </div>

                        </dev>
                        </div>
                        <hr></hr>

                        <div class=" mt-2">

                        <a href={"/shop/"+product.seller.Id} class="ease-in-out transition-transform transform md:hover:text-blue-700 hover:-translate-y-1 w-full text-center my-2 flex items-center space-x-4">
                            <img class="w-10 h-10 rounded-full" src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`} alt=""/>
                            <span class="font-medium dark:text-white">
                                <p data-popover-target="popover-user-profile" className='md:hover:text-blue-700'>{product.seller.Name}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{product.seller.Email}</p>
                            </span>
                        </a>

                        </div>
                    </div>
                    </dev>
                    </div>

            </div>
            ))}
            </div>



            <Footer/>
                            </div>

                        </div>
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
  const id = context.params.Id;
  const response = await axios.get(`http://server-octoo-shop-production.up.railway.app/seller/search/${id}`);
  const data = await response.data;
  const response1 = await axios.get(`http://server-octoo-shop-production.up.railway.app/product/getAll`);
  const data1 = await response1.data;
  return { props: { data, data1 } }
}
export default Seller
