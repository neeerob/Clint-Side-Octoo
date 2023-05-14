import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Footer from "./component/footer";
import MyLayout from "./component/layout";

function changePassword() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Email, setEmail] = useState('');
  const [Lastname, setLastname] = useState(null);
  const [Username, setUsername] = useState(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [Id, setId] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [code, setCode] = useState('');

  const handleToggleMode = (code) => {
    if (code) {
      const username = code;// get the username from the input field or somewhere else;
      setUsername(username);
      const apiEndpoint = `http://server-octoo-shop-production.up.railway.app/moderator/search/s/${username}`;
  
      axios.get(apiEndpoint)
        .then(response => {
          if (response.data.Email) {
            setEmail(response.data.Email);
            const apiEndpoint2 = `http://server-octoo-shop-production.up.railway.app/forgotPassword/${code}`;
            axios.post(apiEndpoint2)
              .then(response2 => {
                setSelectedReport(code);
                setShowPopup(true);
              })
              .catch(error2 => {
                setError('Invalid code!');
                console.error(error2);
              });
          } else {
            setError('Invalid username!');
          }

        })
        .catch(error => {
          setError('Invalid username!');
          console.error(error);
        });
    } else {
      setError('Please enter a username!');
    }
  };
  
  

  const handleClosePopup = () => {
    setSelectedReport(null);
  };



  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    criteriaMode: "all"
  });


  const [Filename, setFileName] = useState(null);

  const handleClearFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  

  const onSubmit = async (data) => {
    console.log(data);
    if (data.newPassword === data.confirmPassword) {
      try {
        const response = await axios.post(
          `http://server-octoo-shop-production.up.railway.app/forgotPassword/setPassword/${Username}`,
          { password: data.newPassword, code: data.code }
        );
        console.log(response.data);
        if(data.affected == 1){
            setError1('Successfully reseted password');
            setError(null);
        }
        else{
            setError1('Successfully reseted password');
            setError(null);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setError('New and Confirm Password mismatch');
    }
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
            <div class="p-6 text-center">
            <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Do you really want to change the password?</h3>
            <td class="border-b border-gray-200   py-5 text-sm">
                Code sent to: <code class="whitespace-no-wrap bg-gray-100 rounded-md px-2 py-1">{Email}</code>
            </td>
            
            <form onSubmit={handleSubmit(onSubmit)}>

<div className="mb-4 relative flex items-center">
  <input
    placeholder="New password"
    type={showPassword ? "text" : "password"}
    id="new-password"
    name="newPassword"
    className="block w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
    {...register("newPassword", { required: true, minLength: 8 })}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 end-0 grid place-content-center px-4"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {showPassword ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      )}
    </svg>
  </button>
</div>

{errors.newPassword && errors.newPassword.type === "required" && (
    <span className="text-red-500 mb-4 text-sm ml-2">This field is required</span>
  )}
  {errors.newPassword && errors.newPassword.type === "minLength" && (
    <span className="text-red-500 mb-4 text-sm ml-2">
      Password must be at least 8 characters
    </span>
  )}



<div className="mb-4 relative flex items-center">
  <input
    placeholder="Confirm password"
    type={showPassword ? "text" : "password"}
    id="confirm-password"
    name="confirmPassword"
    className="block w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
    {...register("confirmPassword", { required: true, minLength: 8 })}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 end-0 grid place-content-center px-4"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {showPassword ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      )}
    </svg>
  </button>
</div>

{errors.confirmPassword && errors.confirmPassword.type === "required" && (
                <span className="text-red-500 mb-4 text-sm">This field is required</span>
                )}
                {errors.confirmPassword && errors.confirmPassword.type === "minLength" && (
                <span className="text-red-500 mb-4 text-sm">Password must be at least 8 characters</span>
                )}



            <div className="mb-4">
                <input
                {...register("code", { required: true, minLength: 5 })}
                placeholder="Enter code sent to your mail"
                type="text"
                id="code"
                name="code"
                className="block w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />

                {errors.code && errors.code.type === "required" && (
                <span className="text-red-500 text-sm">This field is required</span>
                )}
                {errors.code && errors.code.type === "minLength" && (
                <span className="text-red-500 text-sm">Password must be at least 5 characters</span>
                )}

            </div>

            <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                      
                      <span>Change password</span>
                </button>

            </form>

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

            </div>
              
        </div>

      </div>
    </div>
  );


  return (
    <>
      <div>
        <div
          style={{ position: "fixed", top: -10, width: "100%" }}
        >
          <MyLayout title="Change Profile" />
        </div>
      </div>
      

      <div style={{marginTop: '105px'}}>
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                Reset your password
                </h1>

                <div
                className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >

                <dev>

                </dev>

                <div className="mt-8">
                <div className="mt-8">
                    <p className="text-xl font-bold mb-4">Password Recovery</p>
                    <p className="mb-4">
                        Would you like to proceed with the password recovery process? Upon clicking "Proceed", an email will be sent to your registered email address with further instructions on how to recover your password.
                    </p>
                    <p className="mb-4 font-bold">Your username: </p>
                    </div>

                </div>


                <div className="mb-4">
                    <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your uername"
                    type="text"
                    id="code"
                    name="code"
                    className="block w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>

                    <button
                        type="submit"
                        className="hover:bg-indigo-500 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        onClick={() => handleToggleMode(code)}
                    >
                        Proceed
                    </button>

                    <div>
                        <p id="outlined_error_help" class="mt-2 text-center text-sm text-red-600 dark:text-red-400"><span class="font-medium">{error}</span></p>
                    </div>

                </div>
            </div>
            </div>

            {selectedReport && (
      <CardDescription
        product={selectedReport}
        onClose={handleClosePopup}
      />
    )}

    </div>
      <Footer />
    </>
  );
}

export default changePassword;
