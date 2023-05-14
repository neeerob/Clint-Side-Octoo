import SessionCheck from "@/pages/component/sessioncheck";
import axios from "axios";
import { useState, useRef } from "react";
import { useEffect } from 'react';

export default function TransactionComponent({ data }) {

  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [username, seUsername] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined')// checks if the code is running on the client-side and not on the server-side.
    {
        const session = sessionStorage.getItem('username');
        if (session) {
          seUsername(sessionStorage.getItem('username'));
        }          
    }

}, []);

  const filteredData = data.filter((product) => {
    // Check if the product matches the search query
    const matchesSearch =
      product.SenderUsername.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.SellerUsername.toLowerCase().includes(searchValue.toLowerCase());
    // Check if the product should be displayed based on the selected filter
    const shouldDisplay =
      searchType === "all" ||
      (searchType === "out of stock" && product.SelledQuantity == product.Quantity);
    // Check if the product price is within the selected price range
    const isPriceInRange =
      parseFloat(product.Ammount) >= minPrice &&
      parseFloat(product.Ammount) <= maxPrice;
    // Return true if all conditions are met
    return matchesSearch && shouldDisplay && isPriceInRange;
  });

  const count = data.length;
  const blockedCount = data.filter((product) => product.SelledQuantity == product.Quantity).length;
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [action, setAction] = useState("");
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const handleClosePopup = () => {
    setSelectedReport(null);
  };

  const handleToggleMode = (product) => {
    setSelectedReport(product);
    setShowPopup(true);
  };


  const handelDelete = (product) => {
    axios
    .delete(`http://server-octoo-shop-production.up.railway.app/product/delete/${product.Id}`)
    .then((response) => {
      window.location.reload();
      setShowUser(true);
    })
    .catch((error) => {
      console.log(error);
      setError(error);
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


        {product.seller && (
        <div>
            <p className="font-bold mb-2 text-gray-600">Receiver info:</p>
            <a href={"/shop/"+product.seller.Id} className="flex items-center text-gray-500 md:hover:text-blue-700">
            <div>
                <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                    <img class="h-full w-full rounded-full"
                    src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`} 
                    alt="" />
                </div>
                <div class="ml-3">
                    <p class="whitespace-no-wrap">{product.seller.Name}</p>
                    <span class="text-xs text-gray-500">@{product.seller.Username}</span>
                </div>
                </div>
            </div>
            </a>
        </div>
        )}



        <p className="mt-5 mb-2 font-bold text-gray-600">Sender info:</p>
        <a className="flex items-center text-gray-500 md:hover:text-blue-700">
            <div>
                <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-full w-full rounded-full"
                         src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.user.filename}`} 
                         alt="" />
                        </div>
                        <div class="ml-3">
                        <p class="whitespace-no-wrap">{product.user.Firstname} {product.user.Lastname}</p>
                        <span class="text-xs text-gray-500">@{product.user.Username}</span>
                        </div>
                    </div>
            </div>
        </a>

        <div class="mt-4 flex items-center justify-between mb-4 space-x-12">
        </div>
        <p class="mt-4 text-sm text-gray-800 line-clamp-2" title="New York, NY 10004, United States">
                            {product.Discription}
                        </p>

          <div className="flex items-center justify-between mt-2">
            <div className="mt-4">
              <p className="font-bold text-gray-600">Ammount:</p>
              
                    <ul class="mt-2 text-sm space-y-1">
                        <li class="flex items-center">
                        <a className="flex items-center text-gray-500 md:hover:text-blue-700">
                        {product.Ammount.toLocaleString()} &#2547;
                    </a>

                        </li>


                </ul>
            </div>
            <div>
            <p className="font-bold text-gray-600">Purches date:</p>
                  <div className="text-sm">
                    {new Date(product.Timestamp).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );


    

  return (
    <>
      <SessionCheck></SessionCheck>
      <div className="flex justify-left mb-4">
      <div class="relative">
      <div className="flex items-center space-x-4">
    <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchInputChange}
        className="w-64 px-4 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:border-transparent placeholder-gray-500"
    />

    <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-32 px-4 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:border-transparent placeholder-gray-500"
    />

    <span className="text-gray-500">-</span>

    <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-32 px-4 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:border-transparent placeholder-gray-500"
    />
</div>



        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        </div>
        </div>
         <div className="pl-4"></div>


      </div>



      <table class="w-full">
                <thead>
                <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th class="px-5 py-3">ID</th>
                    <th class="px-5 py-3">Sender Info</th>
                    <th class="px-5 py-3">Receiver Indo</th>
                    <th class="px-5 py-3">Ammount</th>
                    <th class="px-5 py-3">Discription</th>
                    <th class="px-5 py-3">Time</th>
                </tr>
                </thead>
                <tbody class="text-gray-500">
                {filteredData.filter((product) => product.SenderUsername === username)
                .slice((page - 1) * perPage, page * perPage)
                .map((product) => (
                <tr key={product.Id} 
                class="hover:bg-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => handleToggleMode(product)}
                >

                    <td class="border-b border-gray-200  px-5 py-5 text-sm">
                    <p class="whitespace-no-wrap">{product.Id}</p>
                    </td>
                    
                    <td class="border-b border-gray-200  px-5 py-5 text-sm">
                    <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-full w-full rounded-full"
                         src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.user.filename}`} 
                         alt="" />
                        </div>
                        <div class="ml-3">
                        <p class="whitespace-no-wrap">{product.user.Firstname} {product.user.Lastname}</p>
                        <span class="text-xs text-gray-500">@{product.user.Username}</span>
                        </div>
                    </div>
                    </td>
                    

                    <td class="border-b border-gray-200  px-5 py-5 text-sm">
                    {product.seller && 
                        <div class="flex items-center">
                            <div class="h-10 w-10 flex-shrink-0">
                                <img class="h-full w-full rounded-full"
                                src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`} 
                                alt="" />
                            </div>
                            <div class="ml-3">
                                <p class="whitespace-no-wrap">{product.seller.Name}</p>
                                <span class="text-xs text-gray-500">@{product.seller.Username}</span>
                            </div>
                        </div>
                    }

                    </td>

                    <td class="border-b border-gray-200  px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{product.Ammount.toLocaleString()} &#2547;</p>
                    </td>
                    <td class="border-b border-gray-200  px-5 py-5 text-sm">
                        <p class="whitespace-no-wrap">{product.Discription}</p>
                    </td>
                    
                    <td>
                        <div>
                        <div className="text-sm">
                            {new Date(product.Timestamp).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            })}
                        </div>
                        </div>
                    </td>

                </tr>

            ))}

                </tbody>
            </table>
    <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span class="text-xs text-gray-600 sm:text-sm"> Please click next to see more products. </span>
        <div class="mt-2 inline-flex sm:mt-0">

                <button
                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                onClick={() => setPage(page => page - 1)}
                disabled={page === 1}
                >
                Prev
                </button>
            <button
                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                onClick={() => setPage(page => page + 1)}
                disabled={page === Math.ceil(filteredData.length / perPage)}
                >
                Next
            </button>


        </div>
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