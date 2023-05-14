import SessionCheck from "@/pages/component/sessioncheck";
import axios from "axios";
import { useState, useRef } from "react";

export default function GetAllProduct({ data }) {

  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredData = data.filter((product) => {
    // Check if the product matches the search query
    const matchesSearch =
      product.ProductName.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.seller.Email.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.seller.Phone.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.seller.Username.toLowerCase().includes(searchValue.toLowerCase());
    // Check if the product should be displayed based on the selected filter
    const shouldDisplay =
      searchType === "all" ||
      (searchType === "out of stock" && product.SelledQuantity == product.Quantity);
    // Check if the product price is within the selected price range
    const isPriceInRange =
      parseFloat(product.Price) >= minPrice &&
      parseFloat(product.Price) <= maxPrice;
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

        <a href={"/product/"+product.Id} className="flex items-center text-gray-500 md:hover:text-blue-700">
            <img
                src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.filename}`}
                className="w-20 h-20 rounded-full mr-2"
            />
            <div>
                <div className="font-small line-clamp-1">
                    {product.ProductName}
                    <li className="flex items-center font-bold text-gray-600">

                    <a className="text-gray-900">{product.Price.toLocaleString()} BDT</a>
                </li>
                </div>
            </div>
        </a>

        <div className="mt-4 flex items-center justify-between mb-4 space-x-12">
        {product.SelledQuantity == product.Quantity ? (
            <span className="flex items-center px-2 text-xs font-semibold text-red-400 bg-white border border-red-400 rounded-md">
            
            Out of stock
            </span>
            
        ) : (
            <span className="flex items-center px-2 text-xs font-semibold text-green-500 bg-white border border-green-500 rounded-md">
            Available
            </span>
        )}
        </div>
        <p className="mt-4 text-sm text-gray-800 line-clamp-2" title="New York, NY 10004, United States">
                            {product.Discription}
                        </p>

          <div className="flex items-center justify-between mt-2">
            <div className="mt-4">
              <p className="font-bold text-gray-600">Seller info:</p>
              
                    <ul className="mt-2 text-sm space-y-1">
                        <li className="flex items-center">
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
                    <li className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    <a href="mailto:${product.Email}" className="text-gray-900 hover:text-blue-700">{product.seller.Email}</a>
                    </li>

                    <li className="flex items-center">
                        <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <a href="tel:${product.Phone}" className="text-gray-900 hover:text-blue-700">{product.seller.Phone}</a>
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


            <div className="p-6 text-center">
            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">What do you want to do with this user?</h3>


            <button onClick={() => handelDelete(product)} type="button" className="mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Delete
                </button>


        </div>
          
        </div>
      </div>
    </div>
  );


    

  return (
    <>
      <SessionCheck></SessionCheck>
      <div className="flex justify-left mb-4">
      <div className="relative">
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



        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        </div>
        </div>
         <div className="pl-4"></div>
         <button
        className={`${
            searchType === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
        } py-1 px-4 rounded-l-md focus:outline-none`}
        onClick={() => setSearchType("all")}
        >
        Available
        </button>
        <button
        className={`${
            searchType === "out of stock" ? "bg-indigo-600 text-white" : "bg-gray-200"
        } py-1 px-4 rounded-r-md focus:outline-none`}
        onClick={() => setSearchType("out of stock")}
        >
        Out of stock
        </button>


      </div>



      <table className="w-full">
                <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Product Info</th>
                    <th className="px-5 py-3">Seller Info</th>
                    <th className="px-5 py-3">Quantity</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Launch date</th>
                </tr>
                </thead>
                <tbody className="text-gray-500">
                {filteredData.slice((page - 1) * perPage, page * perPage).map((product) => (
                <tr key={product.Id} 
                className="hover:bg-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
                onClick={() => handleToggleMode(product)}
                >

                    <td className="border-b border-gray-200  px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{product.Id}</p>
                    </td>
                    <td className="border-b border-gray-200  px-5 py-5 text-sm">
                    <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-full w-full rounded-full"
                         src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.filename}`} 
                         alt="" />
                        </div>
                        <div className="ml-3">
                        <p className="whitespace-no-wrap">{product.ProductName}</p>
                        </div>
                    </div>
                    </td>
                    <td className="border-b border-gray-200  px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{product.seller.Name}</p>
                    <span className="text-xs text-gray-500">{product.seller.Username}</span>
                    </td>
                    <td className="border-b border-gray-200  px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">Available: {product.Quantity - product.SelledQuantity}</p>
                    <span className="text-xs text-gray-500">Sold: {product.SelledQuantity}</span>
                    </td>
                    <td className="border-b border-gray-200  px-5 py-5 text-sm">
                    {/* <p className="whitespace-no-wrap">{product.Price} bdt</p> */}
                    <p className="whitespace-no-wrap">{product.Price.toLocaleString()} &#2547;</p>
                    </td>

                    <td className="border-b border-gray-200  px-5 py-5 text-sm">
                    {product.SelledQuantity == product.Quantity ? (
                      <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Out of stock</span>
                    ) : (
                      <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Available</span>
                    )}
                  </td>

                </tr>

            ))}

                </tbody>
            </table>
    <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm"> Total <span className="text-indigo-500">{count}</span> Products are found and <span className="text-red-500">{blockedCount}</span> out of stock product found . </span>
        <div className="mt-2 inline-flex sm:mt-0">

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