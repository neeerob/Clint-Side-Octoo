import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "../component/footer";
import MyLayout from "../component/layout";
import axios from "axios";
import SessionCheck from "../component/sessioncheck";
import { useForm } from "react-hook-form";

function EditProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [Email, setEmail] = useState(null);
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [DOB, setDob] = useState('');

  

  const handleFormSubmit = async () => {
    if (Firstname && Lastname && DOB && Phone && Email) {
      try {
        const data = {
          "Firstname": Firstname,
          "Lastname": Lastname,
          "DOB": DOB,
          "Email": Email,
          "Phone": Phone
        };
        (JSON.stringify(data)); // Update error state with data object as string
        const username = sessionStorage.getItem('username');
        const response = await axios.put(`http://server-octoo-shop-production.up.railway.app/moderator/edit/byusername/${username}`, data); // Make PUT request with data object
        // console.log(response.data); // Log response data
        setError('');
        setError1('Information updated information!');
        sessionStorage.setItem('username', username);
                sessionStorage.setItem('email', Email);
                sessionStorage.setItem('firstname', Firstname);
                sessionStorage.setItem('lastname', Lastname);
                sessionStorage.setItem('phone', Phone);
                sessionStorage.setItem('dob', DOB);        
      } catch (error) {
        setError1('');
        console.log('error22: ' + error.message);
        setError(error.message);
      }
    } else {
      setError1('');
      setError('Provide proper information');
    }
  };
  
  
  

  const [FirstnameChanged, setFirstnameChanged] = useState(false);
  const [LastnameChange, setLastnameChange] = useState(false);
  const [PhoneChange, setPhoneChange] = useState(false);
  const [EmailChange, setEmailChange] = useState(false);
  const [DobChange, setDobChange] = useState(false);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
    setFirstnameChanged(true);
  };

  const handelLastnameChange = (e) => {
    setLastname(e.target.value);
    setLastnameChange(true);
  };

  const handelPhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneChange(true);
  };

  const handelEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChange(true);
  };

const handelDobChange = (e) => {
    const newDate = e.target.value;
    setDob(newDate);
    setUserData({ ...userData, DOB: newDate });
    document.getElementById("dob").value = newDate;
  };
  



  useEffect(() => {
    const username = sessionStorage.getItem("username");
    axios.get(`http://server-octoo-shop-production.up.railway.app/moderator/search/s/${username}`).then((response) => {
      setUserData(response.data);
      setEmail(response.data.Email);
      setFirstname(response.data.Firstname);
      setLastname(response.data.Lastname);
      setPhone(response.data.Phone);
      setDob(response.data.DOB);
    });
  }, []);

  return (
    <>
      <SessionCheck />
      <div>
        <div
          style={{ position: "fixed", top: -10, width: "100%", zIndex: 1 }}
        >
          <MyLayout title="Change Profile" />
        </div>
      </div>
      

      <div style={{marginTop: '105px'}}>
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Edit Information
                </h1>

                <form
                className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={handleSubmit(handleFormSubmit)}
                >

                        <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="sr-only">Firstname</label>
                            <div className="relative">
                            <input
                                {...register('Firstname')}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter firstname"
                                value={Firstname} 
                                onChange={handleFirstnameChange}
                                />
                            </div>
                        </div>

                        
                        <div className="w-1/2">
                            <label className="sr-only">Lastname</label>
                            <div className="relative">
                            <input
                                {...register('Lastname')}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter lastname"
                                value={Lastname} onChange={handelLastnameChange}
                            />
                            </div>
                        </div>
                        </div>

                        <div className="flex justify-between">
                        <div>
                            {FirstnameChanged && !Firstname && (
                            <p className="text-red-500 text-sm mt-1">Firstname is required</p>
                            )}
                        </div>
                        <div>
                            {LastnameChange && !Lastname && (
                            <p className="text-red-500 text-sm mt-1">Lastname is required</p>
                            )}
                        </div>
                        </div>

                        <label className="sr-only">Phone</label>

                        <div className="relative">
                        <input
                            {...register('Phone')}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter phone"
                            value={Phone} onChange={handelPhoneChange}
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
                            {PhoneChange && !Phone && (
                            <p className="text-red-500 text-sm mt-1">Phone is required</p>
                            )}
                        </div>


                        <label className="sr-only">Email</label>

                        <div className="relative">
                        <input
                            {...register('Email', {
                              required: true,
                              pattern: /^[\w-\.]+@([\w-]+\.)+(com|net|org|gov|edu)$/
                            })}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                            value={Email} onChange={handelEmailChange}
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
                            {EmailChange && !Email && (
                            <p className="text-red-500 text-sm mt-1">Email is required</p>
                            )}
                            {errors.Email && errors.Email.type === "pattern" && (
                          <span className="text-red-500 text-sm mt-1">
                          Invalid email address. Please enter a valid email address in the format of name@example.com, where the domain is one of com, net, org, gov, or edu.
                      </span> 
                        )}
                        </div>

                        


                        <div class="flex justify-center items-center space-x-4">
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
                            value={new Date(userData.DOB).toLocaleDateString("en-CA")}
                            onChange={handelDobChange}
                            />

                            </div>


                        </div>

                        {userData.DOB === '' && (
                            <div>
                            <p className="text-red-500 text-sm mt-1">Date of Birth is required</p>
                            </div>
                        )}

                        </div>

                    <button
                        type="submit"
                        className="hover:bg-indigo-500 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Change
                    </button>
                    <div>
                        <p id="outlined_error_help" class="mt-2 text-center text-sm text-red-600 dark:text-red-400"><span class="font-medium">{error}</span></p>
                    </div>
                    <div>
                      {error1 && (
                        <p id="outlined_error_help" className="mt-2 text-center text-sm text-green-600 dark:text-green-400">
                          <span className="font-medium">{error1}!</span>
                        </p>
                      )}

                    </div>

                </form>
            </div>
            </div>

    </div>



      <Footer />
    </>
  );
}

export default EditProfile;
