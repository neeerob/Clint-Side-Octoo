import { Inter } from 'next/font/google'
import MyLayout from './component/layout'
import Footer from './component/footer'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
import * as React from "react";
import SessionCheck from './component/sessioncheck'
import LoginCheck from './component/loginCheck'


const inter = Inter({ subsets: ['latin'] })

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    
    
    const handleFormSubmit = async () => {
        try {
          const selectedValue = document.getElementById("countries").value;
          if (selectedValue === 'user') {
            const response = await axios.put('http://server-octoo-shop-production.up.railway.app/user/login', { username, password });
            console.log('res: ' + response.data);
            if (response.data.message === 'Invalid username or password') {
              setError('Invalid login');
            } else {
              setError('Valid');
              //IfValid?
              const response1 = await axios.get('http://server-octoo-shop-production.up.railway.app/user/search/s/'+username);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('filename', response1.data.filename);
                sessionStorage.setItem('email', response1.data.Email);
                sessionStorage.setItem('firstname', response1.data.Firstname);
                sessionStorage.setItem('lastname', response1.data.Lastname);
                sessionStorage.setItem('phone', response1.data.Phone);
                sessionStorage.setItem('dob', response1.data.DOB);
                sessionStorage.setItem('blocked', response1.data.Blocked);
                sessionStorage.setItem('id', response1.data.Id);
                sessionStorage.setItem('ammount', response1.data.Wallet);
                sessionStorage.setItem('role', 'user');
                router.push('/user/userPanel');

            }
          } else if (selectedValue === 'seller') {
            console.log('seller');
          } else if (selectedValue === 'admin') {
            console.log('admin');
          } else if (selectedValue === 'moderator') {
            const response = await axios.put('http://server-octoo-shop-production.up.railway.app/moderator/login', { username, password });
            if (response.data.message === 'Successfully logged') {

                const response1 = await axios.get('http://server-octoo-shop-production.up.railway.app/moderator/search/s/'+username);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('filename', response1.data.filename);
                sessionStorage.setItem('email', response1.data.Email);
                sessionStorage.setItem('firstname', response1.data.Firstname);
                sessionStorage.setItem('lastname', response1.data.Lastname);
                sessionStorage.setItem('phone', response1.data.Phone);
                sessionStorage.setItem('dob', response1.data.DOB);
                sessionStorage.setItem('blocked', response1.data.Blocked);
                sessionStorage.setItem('id', response1.data.Id);
                sessionStorage.setItem('role', 'moderator');
                router.push('/moderator/panel');

            } else {
                setError('Invalid login. Wrong username or password!');
            }
          }
        } catch (error) {
          console.log('error22: ' + error.message);
          setError('Invalid login. Wrong username or password!');
        }
      };
        
    
  return (
    <>
    <LoginCheck></LoginCheck>
    <div style={{ position: 'fixed', top: -10, width: '100%', zIndex: 1 }}>
    <MyLayout title='Login'/>
    </div>
    <div style={{marginTop: '105px'}}>
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Welcome back
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Thank you for visiting us again
                </p>

                <form
                className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <p className="text-center text-lg font-medium">Sign in to your account</p>

                    <div>

                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select user type</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500">
                        <option selected value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                    <br></br>
                        

                        <label className="sr-only">username</label>

                        <div className="relative">
                        <input
                            {...register('username', { required: true })}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter username"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">username is required</p>}

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                            </svg>
                        </span>
                        </div>
                    </div>

                    <div>
                        <label for="password" className="sr-only">password</label>

                        <div className="relative">
                        <input
                            {...register('password', { required: true })}
                            type={isPasswordVisible ? "text" : "password"}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4"
                        onMouseLeave={togglePasswordVisibility}
                        onMouseEnter={togglePasswordVisibility}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                            </svg>
                        </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="hover:bg-indigo-500 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                    <div>
                        <p id="outlined_error_help" class="mt-2 text-center text-sm text-red-600 dark:text-red-400"><span class="font-medium">{error}</span></p>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Forgot password? Click &nbsp;
                        <a className="underline md:hover:text-blue-700" href="/resetPassword">here</a>
                        &nbsp; to recover password
                    </p>
                    <p className="text-center text-sm text-gray-500">
                        No account?
                        <a className="underline md:hover:text-blue-700 " href="">Sign up</a>
                    </p>
                </form>
            </div>
            </div>

    </div>
    <Footer/>
    </>
  )
}
