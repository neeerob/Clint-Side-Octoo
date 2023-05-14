// import { Inter } from 'next/font/google'
// import { useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form'
// import * as React from "react";
// import MyLayout from '../component/layout';
// import Footer from '../component/footer';
// import { useEffect } from 'react';
// import SessionCheck from '../component/sessioncheck';


// const inter = Inter({ subsets: ['latin'] })

// export default function Login() {

//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const [products, setProducts] = useState([]);
//     const [username, seUsername] = useState(null);
//     const [file, setFile] = useState(null);
//     const [Email, setEmail] = useState(null);
//     const [Firstname, seFirstname] = useState(null);
//     const [Lastname, seLastname] = useState(null);
//     const [Phone, sePhone] = useState(null);
//     const [DOB, deDob] = useState(null);
//     const [blocked, seBlocked] = useState(null);
//     const [id, seId] = useState(null);

//     const [image, setImage] = useState('');

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };
    
    
//     const { register, handleSubmit, formState: { errors } } = useForm();


    

//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     const togglePasswordVisibility = () => {
//       setIsPasswordVisible(!isPasswordVisible);
//     };

//     useEffect(() => {
//         if (typeof window !== 'undefined')// checks if the code is running on the client-side and not on the server-side.
//         {
//             const session = sessionStorage.getItem('username');
//             if (session) {
//               seUsername(sessionStorage.getItem('username'));
//               setFile(sessionStorage.getItem('filename'));
//               setEmail(sessionStorage.getItem('email'));
//               seFirstname(sessionStorage.getItem('firstname'));
//               seLastname(sessionStorage.getItem('lastname'));
//               sePhone(sessionStorage.getItem('phone'));
//               deDob(sessionStorage.getItem('dob'));
//               seBlocked(sessionStorage.getItem('blocked'));
//               seId(sessionStorage.getItem('id'));
//             }          
//         }
    
//     }, []);

//     function previewImage(event) {
//         const reader = new FileReader();
//         reader.onload = function() {
//           const output = document.getElementById("preview");
//           output.src = reader.result;
//         };
//         reader.readAsDataURL(event.target.files[0]);
//       }
      
    
    
//     const handleFormSubmit = async () => {
//         try {
//             const Username = sessionStorage.getItem('username');
//             const DOB = sessionStorage.getItem('dob');
//             const id = sessionStorage.getItem('id');

//             const response = await axios.put('localhost:3000/moderator/editprofile/'+id, { Username, Firstname, Lastname, DOB, Phone, Email });
//             console.log(response);
//             if(response.effected==1){
//                 // router.push('/moderator/dashboard');
//                 setError(response.data);
//             }
//             else{
//                 setError('Something wrong!');
//             }
//         } catch (error) {
//           console.log('error22: ' + error.message);
//           setError('Invalid login. Wrong username or password!');
//         }
//       };
        
    
//   return (
//     <>
//     <div style={{ position: 'fixed', top: -10, width: '100%', zIndex: 1 }}>
//     <MyLayout title='Change Information'/>
//     <SessionCheck></SessionCheck>
//     </div>
//     <div style={{marginTop: '105px'}}>
//     <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
//             <div className="mx-auto max-w-lg">
//                 <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
//                 Edit profile
//                 </h1>

//                 <form
//                 className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
//                 onSubmit={handleSubmit(handleFormSubmit)}
//                 >

//                         <div className="flex space-x-4">
//                         <div className="w-1/2">
//                             <label className="sr-only">Firstname</label>
//                             <div className="relative">
//                             <input
//                                 className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                 placeholder="Enter firstname"
//                                 value={Firstname} onChange={(e) => seFirstname(e.target.value)}
//                             />
//                             </div>
//                         </div>
//                         <div className="w-1/2">
//                             <label className="sr-only">Lastname</label>
//                             <div className="relative">
//                             <input
//                                 className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                 placeholder="Enter lastname"
//                                 value={Lastname} onChange={(e) => seLastname(e.target.value)}
//                             />
//                             </div>
//                         </div>
//                         </div>




//                         <label className="sr-only">Phone</label>

//                         <div className="relative">
//                         <input
//                             className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                             placeholder="Enter phone"
//                             value={Phone} onChange={(e) => sePhone(e.target.value)}
//                         />

//                         <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
//                             <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-gray-400"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             >
//                             <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-width="2"
//                                 d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                             />
//                             </svg>
//                         </span>
//                         </div>


//                         <label className="sr-only">Email</label>

//                         <div className="relative">
//                         <input
                            
//                             className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                             placeholder="Enter email"
//                             value={Email} onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
//                             <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-gray-400"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             >
//                             <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-width="2"
//                                 d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                             />
//                             </svg>
//                         </span>
//                         </div>


//                         <div class="flex justify-center items-center space-x-4">
//                         <div class="w-1/2">
//                             <label for="dob" className="sr-only">Date of Birth</label>
//                             <div class="relative max-w-sm w-full">
//                             <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                 <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
//                             </div>
//                             <input id="dob" type="date" class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//                             </div>
//                         </div>
//                         </div>


                    
//                     {/* <div className="flex items-center justify-center space-x-4">
//                     <div className="w-20 h-20 rounded-full overflow-hidden">
//                         {image ? (
//                         <img src={image} alt="Uploaded image preview" className="w-full h-full object-cover" />
//                         ) : (
//                         <svg
//                             className="w-full h-full text-gray-300"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                         </svg>
//                         )}
//                     </div>
//                     <div className="flex flex-col items-center justify-center">

//                         <input
//                         type="file"
//                         id="image"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="border py-2 px-3 text-grey-darkest"
//                         />
//                     </div>
//                     </div> */}

//                     <button
//                         type="submit"
//                         className="hover:bg-indigo-500 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
//                     >
//                         Change
//                     </button>
//                     <div>
//                         <p id="outlined_error_help" class="mt-2 text-center text-sm text-red-600 dark:text-red-400"><span class="font-medium">{error}</span></p>
//                     </div>

//                     <p className="text-center text-sm text-gray-500">
//                         Forgot password? Click &nbsp;
//                         <a className="underline md:hover:text-blue-700" href="">here</a>
//                         &nbsp; to recover password
//                     </p>
//                     <p className="text-center text-sm text-gray-500">
//                         No account?
//                         <a className="underline md:hover:text-blue-700 " href="">Sign up</a>
//                     </p>
//                 </form>
//             </div>
//             </div>

//     </div>
//     <Footer/>
//     </>
//   )
// }
