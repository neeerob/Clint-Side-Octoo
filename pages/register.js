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
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [errorDOB, setErrorDOB] = useState('');
    const router = useRouter();
    const [FirstnameChanged, setFirstnameChanged] = useState(false);
    const [LastnameChange, setLastnameChange] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [Filename, setFileName] = useState(null);

    const handleClearFile = () => {
      setFile(null);
      setFilePreview(null);
    };
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    
    
    const handleFormSubmit = async () => {
        try {
          const selectedValue = document.getElementById("countries").value;
          if (selectedValue === 'user') {

            
            if(!dob){
              setErrorDOB('Please enter a valid Date Of Birth');
            }
            else{
              setError1(null);
              if(!file){
                setErrorDOB(null);
                setError('Please chose a profile picture!');
              }
              else{
                setErrorDOB(null);
                setError(null);

                //checking username
                const apiEndpoint = `http://server-octoo-shop-production.up.railway.app/user/search/s/${username}`;
            
                axios.get(apiEndpoint)
                  .then(response => {
                    if (response.data.Email) {
                      setError('Username already exist! Please select a new one.');
                    } else {
                      //axios request here
                      const formData = new FormData();
                      formData.append('Firstname', firstname);
                      formData.append('Lastname', lastname);
                      formData.append('DOB', dob);
                      formData.append('Email', email);
                      formData.append('Phone', phone);
                      formData.append('Username', username);
                      formData.append('Password', password);
                      formData.append('myfile', file);

                      axios.post('http://server-octoo-shop-production.up.railway.app/user/register', formData)
                      .then(response => {
                        console.log(response.data);
                        if(response){
                          setError1('Successfully registered.');
                          router.push('/login');
                        }
                      })
                      .catch(error => {
                        console.error(error);
                      });
                    }
          
                  })
                  .catch(error => {
                    setError('Username already exist!');
                    console.error(error);
                  });    
              }
            }



          } else if (selectedValue === 'seller') {
            console.log('seller');
          } else if (selectedValue === 'admin') {
            console.log('admin');
          } else if (selectedValue === 'moderator') 
          {
            if(!dob){
              setErrorDOB('Please enter a valid Date Of Birth');
            }
            else{
              setError1(null);
              if(!file){
                setErrorDOB(null);
                setError('Please chose a profile picture!');
              }
              else{
                setErrorDOB(null);
                setError(null);

                //checking username
                const apiEndpoint = `http://server-octoo-shop-production.up.railway.app/moderator/search/s/${username}`;
            
                axios.get(apiEndpoint)
                  .then(response => {
                    if (response.data.Email) {
                      setError('Username already exist! Please select a new one.');
                    } else {
                      //axios request here
                      const formData = new FormData();
                      formData.append('Firstname', firstname);
                      formData.append('Lastname', lastname);
                      formData.append('DOB', dob);
                      formData.append('Email', email);
                      formData.append('Phone', phone);
                      formData.append('Username', username);
                      formData.append('Password', password);
                      formData.append('myfile', file);

                      axios.post('http://server-octoo-shop-production.up.railway.app/moderator/register', formData)
                      .then(response => {
                        console.log(response.data);
                        if(response){
                          setError1('Successfully registered.');
                          router.push('/login');
                        }
                      })
                      .catch(error => {
                        console.error(error);
                      });
                    }
          
                  })
                  .catch(error => {
                    setError('Username already exist!');
                    console.error(error);
                  });    
              }
            }


          }
        } catch (error) {
          console.log('error22: ' + error.message);
          setError('Invalid login. Wrong username or password!');
        }
      };
        
    
  return (
    <>
    <div style={{ position: 'fixed', top: -10, width: '100%', zIndex: 1 }}>
    <MyLayout title='Login'/>
    </div>
    <div style={{marginTop: '105px'}}>
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Welcome!
                </h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                Thank you for joining us
                </p>

                <form
                className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <p className="text-center text-lg font-medium">Sign up to your account</p>

                    <div>

                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select user type</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500">
                        <option selected value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                    <br></br>



                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="sr-only">Firstname</label>
                            <div className="relative">
                            <input
                                {...register('firstname', { required: true })}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter firstname"
                                onChange={(e) => setFirstname(e.target.value)}
                                value={firstname}
                                />
                            </div>
                        </div>

                        
                        <div className="w-1/2">
                            <label className="sr-only">Lastname</label>
                            <div className="relative">
                            <input
                                {...register('lastname', { required: true })}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter lastname"
                                onChange={(e) => setLastname(e.target.value)}
                                value={lastname}
                            />
                            </div>
                        </div>
                        </div>

                        <div className="flex justify-between">
                        <div>
                            {errors.firstname  && (
                            <p className="text-red-500 text-sm mt-1">Firstname is required</p>
                            )}
                        </div>
                        <div>
                            {errors.lastname && (
                            <p className="text-red-500 text-sm mt-1">Lastname is required</p>
                            )}
                        </div>
                        </div>
                        

                        <label className="mt-5 sr-only">username</label>

                        <div className="mt-5 relative">
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

                        <div className="mt-5 relative">
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


                          <label className="sr-only">Phone</label>

                          <div className="mt-5 relative">
                          <input
                              {...register('phone', { required: true })}
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Enter phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                          />

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

                          <div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1">Password is required</p>}
                          </div>


                          <label className="sr-only">Email</label>

                          <div className="mt-5 relative">
                          <input
                              {...register('email', {
                                required: true,
                                pattern: /^[\w-\.]+@([\w-]+\.)+(com|net|org|gov|edu)$/
                              })}
                              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />

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

                          <div>
                              {errors.email && (
                              <p className="text-red-500 text-sm mt-1">Email is required</p>
                              )}
                              {errors.email && errors.email.type === "pattern" && (
                            <span className="text-red-500 text-sm mt-1">
                            Invalid email address. Please enter a valid email address in the format of name@example.com, where the domain is one of com, net, org, gov, or edu.
                          </span> 
                          )}
                          </div>




                          <div class="mt-5 flex justify-center items-center space-x-4">
                          <div class="w-1/2">
                            <label for="dob" className="sr-only">Date of Birth</label>
                            <div class="relative max-w-sm w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input
                                id="dob"
                                type="date"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                />
                                </div>
                          </div>
                          </div>
                          {setErrorDOB && (
                              <div>
                              <p className="text-red-500 text-sm mt-1">{errorDOB}</p>
                              </div>
                          )}

                          <label className="mt-5 flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-indigo-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                    className="w-10 h-10 text-gray-400 group-hover:text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-indigo-600">
                    Select a file
                    </p>
                </div>
                <input
                    type="file"
                    onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFilePreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    accept="image/*"
                    className="opacity-0"
                />
                </label>

                {filePreview && (
                    <div className="my-4">
                        <img src={filePreview} alt="Selected Image" className="max-w-xs max-h-xs mx-auto" />
                        <button
                        type="button"
                        onClick={handleClearFile}
                        className="mt-5 cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-5 font-medium text-gray-700 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                        >
                        Clear
                        </button>
                    </div>
                    
                    )}


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
                    <div>
                      <p id="outlined_error_help" class="mt-2 text-center text-sm text-green-600 dark:text-green-400">
                        <span class="font-medium">{error1}</span>
                      </p>
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
