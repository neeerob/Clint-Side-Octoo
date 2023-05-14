import SessionCheck from "@/pages/component/sessioncheck";
import axios from "axios";
import { useState } from "react";
import { useRef } from 'react';

export default function GetAllReportToProcess({ data }) {

    const [searchType, setSearchType] = useState("all");

const filteredData =
  searchType === "processed"
    ? data.filter((product) => product.ModeratorUsername != null)
    : searchType === "unprocessed"
    ? data.filter((product) => product.ModeratorUsername == null)
    : searchType === "all"
    ? data
    : [];

    const [selectedReport, setSelectedReport] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [action, setAction] = useState("");
    const inputRef = useRef(null);
    const [error, setError] = useState('');

    
      const handleClosePopup = () => {
        setSelectedReport(null);
      };
      
      const handleToggleMode = (product) => {
        setSelectedReport(product);
        setShowPopup(true);
      };

      const handleProcess = (product) => {
        if (inputRef.current.value) {
          const apiUrl = `http://server-octoo-shop-production.up.railway.app/report/processReportByModerator/${product.Id}`;
          const body = {
            Action: inputRef.current.value,
            username: sessionStorage.getItem('username'),
          };
      
          axios.put(apiUrl, body)
            .then(response => {
              window.location.reload();
              // setShowReports(true);
            })
            .catch(error => {
              // console.log(error);
            });
      
          setError(null);
        } else {
          setError('Please enter something in action box!');
        }
      };



      const handleDelete = (product) => {
        axios
        .delete(`http://server-octoo-shop-production.up.railway.app/report/delete/${product.Id}`)
        .then((response) => {
          window.location.reload();
            // setShowReports(true);
        })
        .catch((error) => {
          // setError(error);
        });
      };
      
      const CardDescription = ({ product, onClose }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
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

            <a className="flex items-center text-gray-500 md:hover:text-blue-700">
                <img
                    src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.user.filename}`}
                    alt={product.user.Username}
                    className="w-12 h-12 rounded-full mr-2"
                />
                <div>
                    <div className="font-small line-clamp-1">
                        {product.user.Firstname} {product.user.Lastname}
                    </div>
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        @{product.user.Username}
                    </p>
                </div>
            </a>

            <div className="mt-4 flex items-center justify-between mb-4 space-x-12">
            {product.ModeratorUsername ? (
                <span className="flex items-center px-2 text-xs font-semibold text-green-500 bg-white border border-green-500 rounded-md">
                Processed by: @{product.ModeratorUsername}
                </span>
                
            ) : (
                <span className="flex items-center px-2 text-xs font-semibold text-red-400 bg-white border border-red-400 rounded-md">
                Unprocessed
                </span>
            )}
            </div>


            <div className="flex items-center justify-between mb-4 space-x-12">
            {product.ModeratorUsername ? (
                <span className="flex items-center px-2 py-1 text-xs font-semibold text-black-500 bg-white border rounded-md">
                Action: {product.Action}
                </span>
                
            ) : (
                <>
                </>
            )}
            </div>

              <p className="text-gray-600">{product.Discription}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="mt-4">
                  <p className="font-bold text-gray-600">Reported seller info:</p>
                  

                  <a href={"/shop/"+product.seller.Id} className="flex items-center text-gray-500 md:hover:text-blue-700">
                        <img
                            src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`}
                            alt={product.seller.Username}
                            className="w-12 h-12 rounded-full mr-2"
                        />
                        <div className="text-sm">
                            <div className="font-medium">
                            {product.seller.Name}
                            </div>
                            <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                                <path d="M12 22C8.14 22 4.61 20.53 2 18.29V5.71C4.61 3.47 8.14 2 12 2s7.39 1.47 10 3.71v12.58c-2.61 2.24-6.14 3.71-10 3.71zM12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                            </svg>
                            <span>@{product.seller.Username}</span>
                            </div>
                        </div>
                    </a>

                </div>
                <div>
                  <p className="font-bold text-gray-600">Reported on:</p>
                  <div className="text-sm">
                    {new Date(product.Timestamp).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4">
            <p className="font-bold text-gray-600">Seller contact Information:</p>
            <ul className="mt-2 text-sm space-y-1">
                <li className="flex items-center">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                <a href="mailto:${product.seller.Email}" className="text-gray-900 hover:text-blue-700">{product.seller.Email}</a>
                </li>
                <li className="flex items-center">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="tel:${product.seller.Phone}" className="text-gray-900 hover:text-blue-700">{product.seller.Phone}</a>
                </li>
            </ul>
            </div>

                <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">What do you want to do with this report?</h3>

                {product.ModeratorUsername ? (
                    <>
                    </>
                
                ) : (
                    <>
                        <label htmlFor="action" className="block font-semibold text-gray-700">Action:</label>
                        <input
                            ref={inputRef}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter taken action"
                        />
                    </>
                )}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {product.ModeratorUsername ? (
                    <button  onClick={() => handleDelete(product)} type="button" className="mt-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" >
                    Delete
                    </button>
                
                ) : (
                    <>
                    <button onClick={() => handleDelete(product)} type="button" className="mt-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" >
                    Delete
                    </button>
                    <button onClick={() => handleProcess(product)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Process
                    </button>

                    </>
                )}
            </div>
              
            </div>
          </div>
        </div>
      );

  return (
    <>
      <SessionCheck></SessionCheck>
      <div className="flex justify-center mb-4">
        <button
          className={`${
            searchType === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
          } py-1 px-4 rounded-l-md focus:outline-none`}
          onClick={() => setSearchType("all")}
        >
          All
        </button>
        <button
          className={`${
            searchType === "processed" ? "bg-indigo-600 text-white" : "bg-gray-200"
          } py-1 px-4 focus:outline-none`}
          onClick={() => setSearchType("processed")}
        >
          Processed
        </button>
        <button
          className={`${
            searchType === "unprocessed" ? "bg-indigo-600 text-white" : "bg-gray-200"
          } py-1 px-4 rounded-r-md focus:outline-none`}
          onClick={() => setSearchType("unprocessed")}
        >
          Unprocessed
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map((product) => (
          <div
            key={product.Id}
            className="bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            onClick={() => handleToggleMode(product)}
          >
            <div className="p-4">
              <a className="flex items-center text-gray-500 md:hover:text-blue-700">
                <img
                  src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.user.filename}`}
                  alt={product.user.Username}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-small line-clamp-1">
                    {product.user.Firstname} {product.user.Lastname}
                  </div>
                  <div className="text-sm">
                    {new Date(product.Timestamp).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </a>

              <div className="mt-4 flex items-center justify-between mb-4 space-x-12">
            {product.ModeratorUsername ? (
                <span className="flex items-center px-2 text-xs font-semibold text-green-500 bg-white border border-green-500 rounded-md">
                Processed
                </span>
            ) : (
                <span className="flex items-center px-2 text-xs font-semibold text-red-400 bg-white border border-red-400 rounded-md">
                Unprocessed
                </span>
            )}
            </div>


              <div className="flex items-center mb-4">
                <p
                  className=" text-sm text-gray-800 line-clamp-3"
                >
                  {product.Discription}
                </p>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="flex items-center mt-4">
                <div className="text-center text-gray-500 text-xs mb-2">
                  Report to:
                </div>
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
        {selectedReport && (
      <CardDescription
        product={selectedReport}
        onClose={handleClosePopup}
      />
    )}
    </>
  )
}