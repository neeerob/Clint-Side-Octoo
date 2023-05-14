// import { useRouter } from 'next/router'
// import { useState, useEffect } from 'react';
// import axios from "axios";

// export default function ReportComponent({data}){
//     console.log("ok"+data);
//     return(
//         <>
            
//             <div class="flex flex-wrap justify-center" id="card-container">
//                               <div class="md:flex no-wrap md:-mx-2">

//                                   <div class="container mx-auto my-5 p-5">
//                                       <div>
//                                           <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
//                                               <span clas="text-green-500">
//                                                   <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                                                       stroke="currentColor">
//                                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                                   </svg>
//                                               </span>
//                                               <span class="tracking-wide">Report to process</span>
//                                           </div>

//                                         <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
//                                           {data.map(product => (
//                                             <div key={product.Id}>
//                                             <div class="relative mx-auto w-full ">
//                                                 <a href={"/product/"+product.Id} class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
//                                                 <div class="shadow p-4 rounded-lg bg-white">
//                                                     <div class="mt-4">
//                                                     <h2 class="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
//                                                         name
//                                                     </h2>
                                                    
//                                                     </div>
//                                                     <div class="ml-2 mt-3 text-gray-600 uppercase text-xs font-semibold tracking-wider">
//                                                         {product.SelledQuantity} available
//                                                     </div>
//                                                     <p class="mt-4 text-sm text-gray-800 line-clamp-2" title="New York, NY 10004, United States">
//                                                         {product.Discription}
//                                                     </p>

//                                                     <div class="grid grid-cols-2 grid-rows-2 gap-1 mt-2">
//                                                     <p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
//                                                         <svg class="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z"></path></svg>
//                                                         <span class="text-gray-600 text-sm">
//                                                         <span class="text-gray-600 text-sm">{Math.round((new Date() - new Date(product.Timestamp)) / (1000 * 60 * 60 * 24))} days ago</span>
//                                                         </span>
//                                                     </p>
//                                                     <p class="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
//                                                     <div className="flex items-center mt-0">
//                                                         <div className="mr-2">
//                                                         </div>
//                                                         </div>

//                                                     </p>
//                                                     </div>
//                                                     <hr></hr>

//                                                     <div class=" mt-2">

//                                                     <a  href={"/shop/"+product.seller.Id} class="ease-in-out transition-transform transform md:hover:text-blue-700 hover:-translate-y-1 w-full text-center my-2 flex items-center space-x-4">
//                                                         <img class="w-10 h-10 rounded-full" src={`http://localhost:3000/moderator/getimage/${product.seller.filename}`}alt=""/>
//                                                         <div class="font-medium dark:text-white">
//                                                             <div data-popover-target="popover-user-profile" className='md:hover:text-blue-700'>{product.seller.Name}</div>
//                                                             <div class="text-sm text-gray-500 dark:text-gray-400">{product.seller.Email}</div>
//                                                         </div>
//                                                     </a>
//                                                     </div>
//                                                 </div>
//                                                 </a>
//                                                 </div>

//                                           </div>
//                                         ))}
//                                   </div>

//                                       </div>
//                                   </div>

//                               </div>
//                             </div>
 

//         </>
//     )
// }

// export async function getServerSideProps(context) {
//     const response = await axios.get(`http://localhost:3000/report/getall`);
//     const data = await response.data;
//     console.log("WHAT"+data); // add this line
//     return { props: { data } }
// }