import SessionCheck from "@/pages/component/sessioncheck";
import axios from "axios";
import { useState, useRef } from "react";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'

export default function DepositComponent({ data }) {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const username = sessionStorage.getItem('username');
      setUsername(username);
    }, []);
  
    const onSubmit = (data) => {
        if (data.Type === "deposit") {
          axios.post(`http://server-octoo-shop-production.up.railway.app/transaction/deposit/${username}`, {
            SenderUsername: username,
            ReceiverUsername: username,
            Ammount: data.Ammount,
            Discription: data.Discription,
            Timestamp: new Date().toISOString(),
          })
            .then(response => {
                setSuccessMessage('Successfully updated');
                if(response.data){
                    if(response.data.Timestamp){
                        setSuccessMessage('Successfully Done'); // display the entire object as a JSON string
                        window.location.reload();
                    }
                    else{
                        setSuccessMessage(JSON.stringify(response.data)); // display the entire object as a JSON string
                        window.location.reload();
                    }
                  }

            })
            .catch(error => {
              setErrorMessage(error.response.data.message);
            });
        } else {
          axios.post(`http://server-octoo-shop-production.up.railway.app/transaction/withdraw/${username}`, {
            SenderUsername: username,
            ReceiverUsername: username,
            Ammount: data.Ammount,
            Discription: data.Discription,
            Timestamp: new Date().toISOString(),
          })
            .then(response => {
              setSuccessMessage('Successfully updated');
              if(response.data){
                if(response.data.Timestamp){
                    
                    setSuccessMessage('Successfully Done'); // display the entire object as a JSON string
                    window.location.reload();
                }
                else{
                    setSuccessMessage(JSON.stringify(response.data)); // display the entire object as a JSON string
                    window.location.reload();
                }
              }
            })
            .catch(error => {
              setErrorMessage(error.response.data.message);
            });
        }
      };
      
    

  return (
    <>
      <SessionCheck></SessionCheck>
      <div className="flex justify-left mb-4">
      <div class="relative">



        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        </div>
        </div>
         <div className="pl-4"></div>


      </div>


      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Transaction option
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                You can do Withdraw/Deposit option here
                </p>



                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
      Amount:
    </label>
    <input
      className={`shadow appearance-none border ${errors.Ammount ? 'border-red-500' : 'border-gray-400'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      id="amount"
      type="number"
      {...register("Ammount", { required: true })}
    />
    {errors.Ammount && <p className="text-red-500 text-xs italic">This field is required</p>}
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
      Description:
    </label>
    <input
      className={`shadow appearance-none border ${errors.Discription ? 'border-red-500' : 'border-gray-400'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      id="description"
      type="text"
      {...register("Discription", { required: true })}
    />
    {errors.Discription && <p className="text-red-500 text-xs italic">This field is required</p>}
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
      Transaction Type:
    </label>
    <select
      className={`shadow appearance-none border ${errors.Type ? 'border-red-500' : 'border-gray-400'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      id="type"
      {...register("Type", { required: true })}
    >
      <option value="">--Select Type--</option>
      <option value="deposit">Deposit</option>
      <option value="withdraw">Withdraw</option>
    </select>
    {errors.Type && <p className="text-red-500 text-xs italic">This field is required</p>}
  </div>
  <div className="flex items-center justify-between">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Submit
    </button>
    <div>
      {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
    </div>
  </div>
</form>




            </div>
            </div>
    </>
  )
}