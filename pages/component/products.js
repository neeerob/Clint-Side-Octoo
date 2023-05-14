import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Products(){
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
      axios.get('https://server-octoo-shop-production.up.railway.app/product/getAll')
        .then(res => {
          setProducts(res.data);
        })
        .catch(err => {
          console.log(err);
        });
             
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
      };
    
      const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
      };

      const filteredProducts = products.filter(
        (product) =>
          product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (minPrice === "" || product.Price >= minPrice) &&
          (maxPrice === "" || product.Price <= maxPrice)
      );
       

    return(
<>
        <section className='gap-6 mt-5'>


        <section className='gap-6 mt-5 flex flex-col items-center'>
        <div className=" flex justify-center w-full">
                <input 
                    type="number" 
                    placeholder="Min Price"
                    onChange={handleMinPriceChange} 
                    value={minPrice} 
                    className="border border-gray-300 rounded-md py-2 px-3 w-1/6 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-center"
                />
                <input 
                    type="number" 
                    placeholder="Max Price"
                    onChange={handleMaxPriceChange} 
                    value={maxPrice} 
                    className="border border-gray-300 rounded-md py-2 px-3 w-1/6 ml-2 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-center"
                />
                <input 
                    type="text" 
                    placeholder="Search"
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md py-2 px-3 w-2/3 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-center"
                />
        </div>


            </section>

            <br></br><br></br>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full ">
            {filteredProducts.map(product => (
                <div key={product.Id}>
                <div className="relative mx-auto w-full ">
                    <a href={"/product/"+product.Id} className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                    <div className="shadow p-4 rounded-lg bg-white">
                        <div className="flex justify-center relative rounded-lg overflow-hidden h-70 object-fill">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 ">
                                <img className=" rounded max-w-full align-middle border-none"
                                    src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.filename}`}
                                    alt={product.ProductName}
                                    style={{width: "250px", height: "250px"}}
                                />
                        </div>

                            <div className="absolute flex justify-center bottom-0 mb-3">
                                
                            </div>

                            <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                                New
                            </span>
                        </div>

                        <div className="mt-4">
                        <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1" title="New York">
                            {product.ProductName}
                        </h2>
                        
                        </div>
                        <div className="flex item-center justify-between mt-3">
                        <h1 className="text-1.5xl font-bold text-gray-900">{product.Price.toLocaleString()} &#2547;</h1>
                            <button className="px-2 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to Card</button>
                        </div>
                        <div className="ml-2 mt-3 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            {product.SelledQuantity} Sold  &bull; {product.Quantity - product.SelledQuantity} Available
                        </div>
                        <p className="mt-4 text-sm text-gray-800 line-clamp-2" title="New York, NY 10004, United States">
                            {product.Discription}
                        </p>

                        <div className="grid grid-cols-2 grid-rows-2 gap-1 mt-2">
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
                            <svg className="inline-block w-5 h-5 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z"></path></svg>
                            <span className="text-gray-600 text-sm">
                            <span className="text-gray-600 text-sm">{Math.round((new Date() - new Date(product.PublishedDate)) / (1000 * 60 * 60 * 24))} days ago</span>
                            </span>
                        </p>
                        <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
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

                        </p>
                        </div>
                        <hr></hr>

                        <div className=" mt-2">

                        <a  href={"/shop/"+product.seller.Id} className="ease-in-out transition-transform transform md:hover:text-blue-700 hover:-translate-y-1 w-full text-center my-2 flex items-center space-x-4">
                            <img className="w-10 h-10 rounded-full" src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${product.seller.filename}`}alt=""/>
                            <div className="font-medium dark:text-white">
                                <div data-popover-target="popover-user-profile" className='md:hover:text-blue-700'>{product.seller.Name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{product.seller.Email}</div>
                            </div>
                        </a>
                        </div>
                    </div>
                    </a>
                    </div>

            </div>
            ))}
            </div>


        <br></br>

        </section>

        </>
    )
}



