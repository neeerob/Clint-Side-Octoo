import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "../component/footer";
import MyLayout from "../component/layout";
import axios from "axios";
import SessionCheck from "../component/sessioncheck";
import { useForm } from "react-hook-form";

function changeProfilePic() {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState(null);
  const [Username, setUsername] = useState(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [Id, setId] = useState(null);



  const { register, handleSubmit, formState: { errors } } = useForm();

  const [Filename, setFileName] = useState(null);

  const handleClearFile = () => {
    setFile(null);
    setFilePreview(null);
  };
  

  const handleFormSubmit = async () => {
    try {
        if (!file) {
            setError('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('myfile', file);

        const response = await axios.put(
            `http://server-octoo-shop-production.up.railway.app/moderator/editPic/${Id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        console.log(response);
        sessionStorage.setItem('filename', response.data);
        window.location.reload();
        
    } catch (error) {
        console.error(error);
        setError('An error occurred while changing the profile picture');
    }
};


  
  


  useEffect(() => {
    const username = sessionStorage.getItem("username");
    axios.get(`http://server-octoo-shop-production.up.railway.app/moderator/search/s/${username}`).then((response) => {
      setUserData(response.data);
      setFileName(response.data.filename);
      setFirstname(response.data.Firstname);
      setLastname(response.data.Lastname);
      setUsername(response.data.Username);
      setId(response.data.Id);
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
                Change Profile Picture
                </h1>

                <form
                className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                onSubmit={handleSubmit(handleFormSubmit)}
                >

                <a className="flex items-center text-gray-500 md:hover:text-blue-700">
                    <img
                        src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${Filename}`}
                        className="w-12 h-12 rounded-full mr-2"
                    />
                    <div>
                        <div className="font-small line-clamp-1">
                            {Firstname} {Lastname}
                        </div>
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                            @{Username}
                        </p>
                    </div>
                </a>

                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-indigo-300 group">
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

export default changeProfilePic;
